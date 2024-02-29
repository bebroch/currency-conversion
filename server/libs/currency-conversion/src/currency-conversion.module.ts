import { Module } from "@nestjs/common"
import { CurrencyApiModule } from "./currency-api/currency-api.module"
import { CurrencyConversionService } from "./currency-conversion.service"

@Module({
    imports: [CurrencyApiModule],
    providers: [CurrencyConversionService],
    exports: [CurrencyConversionService],
})
export class CurrencyConversionModule {}