"server-only";

import OpenAI from "openai";

/**
 * @description OpenAIのclient
 */
export const openAiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
