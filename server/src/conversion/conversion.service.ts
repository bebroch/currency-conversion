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
        console.log(fromCurrency, toCurrency, count)

        if (!fromCurrency || !toCurrency)
            throw new BadRequestException("Invalid request. None fromCurrency or toCurrency.")

        const data = await this.currencyConversionService.getExchangeRate(fromCurrency, toCurrency)

        if (!data)
            throw new InternalServerErrorException(
                "Error occurred while fetching data from external service.",
            )

        return {
            ...data,
            value: data.value * count,
        }
    }
}
