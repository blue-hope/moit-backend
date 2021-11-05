import * as CacheManager from 'cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import redisConfig from './redis.config';

export const CacheSingleton = (function () {
  const ttl = 60;
  let manager;
  return {
    prepareRedis: function () {
      manager = CacheManager.caching({
        store: redisStore,
        ...redisConfig,
      }).set;
    },
    prepareMemcache: function () {
      manager = CacheManager.caching({
        store: 'memory',
        max: 100,
        ttl: ttl,
      });
    },
    set: async function (
      key: string,
      value: any,
      option: CacheManager.CachingConfig = { ttl: ttl },
    ) {
      await manager.set(key, value, option);
    },
    get: async function (key: string) {
      return await manager.get(key);
    },
  };
})();
