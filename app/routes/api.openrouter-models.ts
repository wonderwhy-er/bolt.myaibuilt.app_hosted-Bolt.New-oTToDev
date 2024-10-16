import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { getAPIKey } from '~/lib/.server/llm/api-key';

export async function loader({ context, request }: LoaderFunctionArgs) {
  // Get the API key from the cookie
  const cookieHeader = request.headers.get('Cookie');
  const openRouterApiKey = cookieHeader?.match(/openrouter-api-key=([^;]+)/)?.[1];

  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${openRouterApiKey || getAPIKey(context.cloudflare.env)}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return json({ models: data.data });
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error);
    return json({ error: 'Failed to fetch OpenRouter models' }, { status: 500 });
  }
}
