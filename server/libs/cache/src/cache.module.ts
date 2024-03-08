import { CacheModule as CacheModuleFromNest } from "@nestjs/cache-manager"
import { Module } from "@nestjs/common"
import { CacheService } from "./cache.service"

@Module({
    imports: [
        CacheModuleFromNest.register({
            store: "redis",
            host: "currency-conversion-redis",
            port: 6379,
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
