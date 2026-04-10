import { ContentChunk } from "./content";

const GROQ_API_URL = "https://api.groq.com/openai/v1";

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "it", "in", "on", "at", "to", "for", "of", "and",
  "or", "but", "not", "with", "this", "that", "are", "was", "be", "by",
  "from", "as", "what", "which", "who", "how", "do", "did", "does", "can",
  "could", "would", "should", "have", "has", "had", "will", "your", "his",
  "her", "their", "about", "any", "me", "you", "i", "we", "they", "tell",
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
  );
}

/**
 * Retrieve top-k most relevant chunks using keyword overlap scoring
 */
export async function retrieveRelevantChunks(
  question: string,
  chunks: ContentChunk[],
  _apiKey: string,
  topK = 5,
  _embeddingModel?: string
): Promise<ContentChunk[]> {
  const queryTokens = tokenize(question);

  const scored = chunks.map((chunk, index) => {
    const chunkTokens = tokenize(chunk.text);
    let score = 0;
    for (const token of Array.from(queryTokens)) {
      if (chunkTokens.has(token)) score++;
    }
    return { index, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topIndices = scored.slice(0, topK).map((s) => s.index);
  return topIndices.map((i) => chunks[i]);
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: { message: { content: string } }[];
}

/**
 * Generate answer using Groq chat completion
 */
export async function generateAnswer(
  question: string,
  context: ContentChunk[],
  apiKey: string,
  model = "llama-3.3-70b-versatile"
): Promise<string> {
  const contextText = context
    .map((c) => `[Source: ${c.source.title}]\n${c.text}`)
    .join("\n\n---\n\n");

  const systemPrompt = `You are a helpful AI assistant for Arnav Gokhale's portfolio website. Your role is to answer questions about Arnav based ONLY on the provided context from his portfolio.

STRICT RULES:
1. Only use information explicitly stated in the context below.
2. Never invent, hallucinate, or assume information not in the context.
3. If the answer is not in the context, say: "I don't have that info from Arnav's portfolio yet. You can reach out directly via the Contact page."
4. Keep answers concise and professional.
5. When relevant, mention which project or page the information comes from.
6. Never claim Arnav has skills, experience, or achievements not mentioned in the context.

CONTEXT FROM PORTFOLIO:
${contextText}`;

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: question },
  ];

  const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Chat API error: ${response.status} ${error}`);
  }

  const data: ChatResponse = await response.json();
  return data.choices[0].message.content;
}
