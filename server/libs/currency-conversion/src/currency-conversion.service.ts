import { CurrencyEnum } from "@currency-conversion/currency-conversion/apis/currency-api/enums/currency.enums"
import { Injectable } from "@nestjs/common"
import { CurrencyApiService } from "./apis/currency-api/currency-api.service"
import { ConvertCurrencyType } from "./types/convert-currency.types"

@Injectable()
export class CurrencyConversionService {
    constructor(private currencyApiService: CurrencyApiService) {}

    public async convert(
        fromCurrency: CurrencyEnum,
        toCurrency: CurrencyEnum,
        count: number = 1,
    ): Promise<ConvertCurrencyType> {
        if (!fromCurrency || !toCurrency) throw new Error("Currency must be CurrencyEnum")
        if (count < 0) throw new Error("Currency count must be greater than zero")

        const convertData = await this.currencyApiService.latest(fromCurrency, toCurrency)

        if (!convertData) return null

        return {
            fromCurrency,
            toCurrency,
            currencyCode: `${fromCurrency}-${convertData.data[toCurrency].code}`,
            value: convertData.data[toCurrency].value * count,
        }
    }
}
