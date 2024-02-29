import { Injectable } from "@nestjs/common"
import { CurrencyApiService } from "./currency-api/currency-api.service"
import { CurrencyEnum } from "./currency-api/types/currency.enums"
import { ConvertCurrencyType } from "./types/convert-currency.types"

@Injectable()
export class CurrencyConversionService {
    constructor(private currencyApiService: CurrencyApiService) {}

    public async convert(
        fromCurrency: CurrencyEnum,
        toCurrency: CurrencyEnum,
    ): Promise<ConvertCurrencyType> {
        const convertData = await this.currencyApiService.latest(fromCurrency, toCurrency)

        return {
            fromCurrency,
            toCurrency,
            currencyCode: `${fromCurrency}-${convertData.data[toCurrency].code}`,
            value: convertData.data[toCurrency].value,
        }
    }
}
