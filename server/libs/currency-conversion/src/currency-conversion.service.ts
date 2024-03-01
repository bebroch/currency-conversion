import { CurrencyEnum } from "@global-common/currency.enums"
import { Injectable } from "@nestjs/common"
import { CurrencyApiService } from "./currency-api/currency-api.service"
import { ConvertCurrencyType } from "./types/convert-currency.types"

@Injectable()
export class CurrencyConversionService {
    constructor(private currencyApiService: CurrencyApiService) {}

    public async convert(
        fromCurrency: CurrencyEnum,
        toCurrency: CurrencyEnum,
        count: number = 1,
        numberOfDecimalPlaces: number = 10000,
    ): Promise<ConvertCurrencyType> {
        function trimDecimal(count: number, decimalCount: number) {
            return Math.floor(count * decimalCount) / decimalCount
        }

        if (count < 0) throw new Error("Currency count must be greater than zero")

        const convertData = await this.currencyApiService.latest(fromCurrency, toCurrency)

        if (!convertData) return null

        const value =
            numberOfDecimalPlaces === -1
                ? trimDecimal(convertData.data[toCurrency].value * count, 1)
                : trimDecimal(convertData.data[toCurrency].value * count, numberOfDecimalPlaces)

        return {
            fromCurrency,
            toCurrency,
            currencyCode: `${fromCurrency}-${convertData.data[toCurrency].code}`,
            value,
        }
    }
}
