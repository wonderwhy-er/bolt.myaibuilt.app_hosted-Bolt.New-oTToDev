import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { getAPIKey } from '~/lib/.server/llm/api-key';

const modelCache = {};
export async function getModels(openRouterApiKey: string) {
  let fromCache = modelCache[openRouterApiKey];
  if (!fromCache || new Date().getUTCSeconds() - fromCache.time > 300) {
    fromCache = modelCache[openRouterApiKey] = {
      promise: (fetch('https://openrouter.ai/api/v1/models', {
        headers: {
          'Authorization': `Bearer ${openRouterApiKey}`,
          'Content-Type': 'application/json'
        }
      })).then(r => r.json()),
      time: new Date().getUTCSeconds()
    };
  }

  return (await fromCache.promise).data;
}

export async function loader({ context, request }: LoaderFunctionArgs) {
  // Get the API key from the cookie
  try {
    const cookieHeader = request.headers.get('Cookie');
    const openRouterApiKey = cookieHeader?.match(/openrouter-api-key=([^;]+)/)?.[1];

    const data = await getModels(openRouterApiKey || getAPIKey(context.cloudflare.env));
    return json({ models: data });
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error);
    return json({ error: 'Failed to fetch OpenRouter models' }, { status: 500 });
  }
}
