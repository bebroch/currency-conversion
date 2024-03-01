import { CurrencyConversionService } from "@currency-conversion/currency-conversion"
import { ConvertCurrencyType } from "@currency-conversion/currency-conversion/types/convert-currency.types"
import { CurrencyEnum } from "@global-common/currency.enums"
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common"

@Injectable()
export class ConversionService {
    constructor(private currencyConversionService: CurrencyConversionService) {}

    public async conversion(
        fromCurrency: CurrencyEnum,
        toCurrency: CurrencyEnum,
        count?: number,
    ): Promise<ConvertCurrencyType> {
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
