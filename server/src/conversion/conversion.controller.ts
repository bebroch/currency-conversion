import { CurrencyEnum } from "@currency-conversion/currency-conversion/apis/currency-api/enums/currency.enums"
import { Controller, Get, Query } from "@nestjs/common"
import { ConversionService } from "./conversion.service"

@Controller("conversion")
export class ConversionController {
    constructor(private readonly conversionService: ConversionService) {}

    @Get()
    currencyConversion(
        @Query("from-currency") fromCurrency: CurrencyEnum,
        @Query("to-currency") toCurrency: CurrencyEnum,
        @Query("count") count: number,
    ) {
        return this.conversionService.conversion(fromCurrency, toCurrency, count)
    }
}
