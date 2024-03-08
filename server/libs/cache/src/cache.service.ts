import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Inject, Injectable } from "@nestjs/common"
import { Cache, Milliseconds } from "cache-manager"

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    public async get(key: string) {
        return await this.cacheManager.get(key)
    }

    public async set(key: string, data: unknown, ttl: Milliseconds) {
        return await this.cacheManager.set(key, data, ttl)
    }
}
