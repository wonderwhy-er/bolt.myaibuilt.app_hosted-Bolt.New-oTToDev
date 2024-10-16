import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function getOpenRouterClient(apiKey: string) {
  return createOpenRouter({
    apiKey: apiKey,
  });
}

export function getModel(apiKey: string, modelId: string) {
  const openrouter = getOpenRouterClient(apiKey);
  return openrouter(modelId);
}
