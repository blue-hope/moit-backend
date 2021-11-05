import { SecretsManagerSingleton } from '@config/secrets_manager/secrets_manager';

export default {
  host: SecretsManagerSingleton.getValue('REDIS_HOST'),
  post: SecretsManagerSingleton.getValue('REDIS_PORT'),
  ttl: SecretsManagerSingleton.getValue('REDIS_TTL'),
};
