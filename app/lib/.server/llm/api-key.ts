import { env } from 'node:process';

export function getAPIKey(cloudflareEnv: Env) {
  /**
   * The `cloudflareEnv` is only used when deployed or when previewing locally.
   * In development the environment variables are available through `env`.
   */
  const keys = env?.OPEN_ROUTER_API_KEY || cloudflareEnv?.OPEN_ROUTER_API_KEY || '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';
  const split = keys.split(':');
  return split[Math.floor(Math.random() * split.length)];
}
