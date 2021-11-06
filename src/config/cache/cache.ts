import * as CacheManager from 'cache-manager';

export const CacheSingleton = (function () {
  const ttl = 60;
  let manager;
  return {
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
