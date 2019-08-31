import path from 'path';
import { getSecret } from 'docker-secret';

function isSecret(key: string) {
  const env = process.env[key];
  return env && env.includes('/run/secrets') ? true : false;
}

function getSecrets(): NodeJS.ProcessEnv {
  return Object.keys(process.env).reduce(
    (env: any, key: string): NodeJS.ProcessEnv => {
      const envValue = process.env[key];
      if (envValue && isSecret(key)) {
        env[key] = getSecret(path.basename(envValue));
      }
      return env;
    },
    {}
  );
}

process.env = { ...process.env, ...getSecrets() };
