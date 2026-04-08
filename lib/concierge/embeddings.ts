import { ContentChunk } from "./content";

const OPENAI_API_URL = "https://api.openai.com/v1";

interface EmbeddingResponse {
  data: { embedding: number[]; index: number }[];
  usage: { prompt_tokens: number; total_tokens: number };
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: { message: { content: string } }[];
  usage: { prompt_tokens: number; completion_tokens: number };
}

/**
 * Get embedding for a single text
 */
async function getEmbedding(
  text: string,
  apiKey: string,
  model = "text-embedding-3-small"
): Promise<number[]> {
  const response = await fetch(`${OPENAI_API_URL}/embeddings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: text,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Embedding API error: ${response.status} ${error}`);
  }

  const data: EmbeddingResponse = await response.json();
  return data.data[0].embedding;
}

/**
 * Get embeddings for multiple texts (batched)
 */
async function getEmbeddings(
  texts: string[],
  apiKey: string,
  model = "text-embedding-3-small"
): Promise<number[][]> {
  const response = await fetch(`${OPENAI_API_URL}/embeddings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: texts,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Embedding API error: ${response.status} ${error}`);
  }

  const data: EmbeddingResponse = await response.json();
  // Sort by index to maintain order
  return data.data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
}

/**
 * Cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Retrieve top-k most similar chunks
 */
export async function retrieveRelevantChunks(
  question: string,
  chunks: ContentChunk[],
  apiKey: string,
  topK = 5,
  embeddingModel = "text-embedding-3-small"
): Promise<ContentChunk[]> {
  // Get all embeddings in batch
  const allTexts = [question, ...chunks.map((c) => c.text)];
  const embeddings = await getEmbeddings(allTexts, apiKey, embeddingModel);

  const questionEmbedding = embeddings[0];
  const chunkEmbeddings = embeddings.slice(1);

  // Calculate similarities
  const similarities = chunkEmbeddings.map((emb, i) => ({
    index: i,
    score: cosineSimilarity(questionEmbedding, emb),
  }));

  // Sort by similarity and take top-k
  similarities.sort((a, b) => b.score - a.score);
  const topIndices = similarities.slice(0, topK).map((s) => s.index);

  return topIndices.map((i) => chunks[i]);
}

/**
 * Generate answer using chat completion
 */
export async function generateAnswer(
  question: string,
  context: ContentChunk[],
  apiKey: string,
  model = "gpt-4o-mini"
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

  const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
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
