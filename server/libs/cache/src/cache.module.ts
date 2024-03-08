import { CacheModule as CacheModuleFromNest } from "@nestjs/cache-manager"
import { Module } from "@nestjs/common"
import { CacheService } from "./cache.service"

@Module({
    imports: [CacheModuleFromNest.register()],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
