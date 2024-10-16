import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { getAPIKey } from '~/lib/.server/llm/api-key';
import { getModels } from '~/routes/api.openrouter-models';

export function getOpenRouterClient(apiKey: string) {
  return createOpenRouter({
    apiKey: apiKey,
  });
}

export async function getModel(apiKey: string | undefined, env, modelId: string) {
  if (!apiKey) {
    apiKey = getAPIKey(env);
    const models = await getModels(apiKey);
    const selectedModel = models.find(m => m.id === modelId);
    if (Number(selectedModel.pricing.prompt) + Number(selectedModel.pricing.completion) !== 0) {
      modelId = models.find(m => Number(selectedModel.pricing.prompt) + Number(selectedModel.pricing.completion) === 0).modeId;
    }
  }
  const openrouter = getOpenRouterClient(apiKey);
  return openrouter(modelId);
}
