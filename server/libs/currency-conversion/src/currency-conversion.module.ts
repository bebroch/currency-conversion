import { CacheModule } from "@cache/cache"
import { Module } from "@nestjs/common"
import { CurrencyApiModule } from "./apis/currency-api/currency-api.module"
import { CurrencyConversionService } from "./currency-conversion.service"

@Module({
    imports: [CurrencyApiModule, CacheModule],
    providers: [CurrencyConversionService],
    exports: [CurrencyConversionService],
})
export class CurrencyConversionModule {}
