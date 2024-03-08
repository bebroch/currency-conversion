import { CurrencyConversionService } from "@currency-conversion/currency-conversion"
import { CurrencyEnum } from "@currency-conversion/currency-conversion/apis/currency-api/enums/currency.enums"
import { ConvertCurrencyType } from "@currency-conversion/currency-conversion/types/convert-currency.types"
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common"

@Injectable()
export class ConversionService {
    constructor(private currencyConversionService: CurrencyConversionService) {}

    public async conversion(
        fromCurrency: CurrencyEnum,
        toCurrency: CurrencyEnum,
        count?: number,
    ): Promise<ConvertCurrencyType> {
        console.log(fromCurrency, toCurrency, count, 1)
        return {
            fromCurrency: CurrencyEnum.USD,
            toCurrency: CurrencyEnum.RUB,
            currencyCode: "string",
            value: Math.floor(91.3132 * count * 10000) / 10000,
        }

        if (!fromCurrency || !toCurrency)
            throw new BadRequestException("Invalid request. None fromCurrency or toCurrency.")

        const data = await this.currencyConversionService.convert(fromCurrency, toCurrency, count)

        if (!data)
            throw new InternalServerErrorException(
                "Error occurred while fetching data from external service.",
            )

        return data
    }
}
