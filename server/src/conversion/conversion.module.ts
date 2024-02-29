import { CurrencyConversionModule } from "@currency-conversion/currency-conversion"
import { Module } from "@nestjs/common"
import { ConversionController } from "./conversion.controller"
import { ConversionService } from "./conversion.service"

@Module({
    imports: [CurrencyConversionModule],
    controllers: [ConversionController],
    providers: [ConversionService],
})
export class ConversionModule {}
