import { NextRequest, NextResponse } from "next/server";
import { loadAllContent, getSourcesFromChunks } from "@/lib/concierge/content";
import {
  retrieveRelevantChunks,
  generateAnswer,
} from "@/lib/concierge/embeddings";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10; // requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Cache content chunks (they don't change at runtime)
let cachedChunks: ReturnType<typeof loadAllContent> | null = null;

function getChunks() {
  if (!cachedChunks) {
    cachedChunks = loadAllContent();
  }
  return cachedChunks;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a moment." },
        { status: 429 }
      );
    }

    // Check for API key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Concierge is not configured. Missing API key." },
        { status: 503 }
      );
    }

    // Parse request body
    const body = await request.json();
    const question = body.question || body.messages?.[body.messages.length - 1]?.content;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid question" },
        { status: 400 }
      );
    }

    // Limit question length
    if (question.length > 500) {
      return NextResponse.json(
        { error: "Question too long. Please keep it under 500 characters." },
        { status: 400 }
      );
    }

    // Load content chunks
    const chunks = getChunks();

    if (chunks.length === 0) {
      return NextResponse.json(
        { error: "No portfolio content available" },
        { status: 500 }
      );
    }

    // Get model config from env or use default
    const chatModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    // Retrieve relevant chunks
    const relevantChunks = await retrieveRelevantChunks(
      question,
      chunks,
      apiKey,
      5
    );

    // Generate answer
    const answer = await generateAnswer(
      question,
      relevantChunks,
      apiKey,
      chatModel
    );

    // Get unique sources from relevant chunks
    const sources = getSourcesFromChunks(relevantChunks);

    return NextResponse.json({
      answer,
      sources,
    });
  } catch (error) {
    console.error("Concierge error:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    // Don't expose internal errors to client
    if (message.includes("API")) {
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again." },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
