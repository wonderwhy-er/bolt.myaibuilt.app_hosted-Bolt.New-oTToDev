import { createOpenRouter } from "@openrouter/ai-sdk-provider";
export function getAnthropicModel(apiKey: string) {
  const openrouter = createOpenRouter({
    apiKey: apiKey,
  });

  return openrouter("anthropic/claude-3.5-sonnet:beta");
}
