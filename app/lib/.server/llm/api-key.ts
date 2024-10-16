import { env } from 'node:process';

export function getAPIKey(cloudflareEnv: Env) {
  /**
   * The `cloudflareEnv` is only used when deployed or when previewing locally.
   * In development the environment variables are available through `env`.
   */
  return env.ANTHROPIC_API_KEY || cloudflareEnv.ANTHROPIC_API_KEY || "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";
}
