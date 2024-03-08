import { CacheService } from "@cache/cache"
import { CurrencyEnum } from "@currency-conversion/currency-conversion/apis/currency-api/enums/currency.enums"
import { Injectable } from "@nestjs/common"
import { CurrencyApiService } from "./apis/currency-api/currency-api.service"
import { ConvertCurrencyType } from "./types/convert-currency.types"

@Injectable()
export class CurrencyConversionService {
    constructor(
        private currencyApiService: CurrencyApiService,
        private cacheService: CacheService,
    ) {}

    public async getExchangeRate(
        fromCurrency: CurrencyEnum,
        toCurrency: CurrencyEnum,
    ): Promise<ConvertCurrencyType | null> {
        if (!fromCurrency || !toCurrency) throw new Error("Currency must be CurrencyEnum")

        // Кеш
        const cacheData = await this.checkCache(fromCurrency, toCurrency)
        if (cacheData) return cacheData

        // Получение курса
        const convertData = await this.currencyApiService.latest(fromCurrency, toCurrency)
        if (!convertData) return null

        const data = {
            fromCurrency,
            toCurrency,
            currencyCode: `${fromCurrency}-${convertData.data[toCurrency].code}`,
            value: convertData.data[toCurrency].value,
        }

        // Кеш на 1 минуту
        this.cacheService.set(data.currencyCode, data, 60000)

        return data
    }

    // Ищет в кеше курс валюты по ключу "с валюты-в валюту"
    private async checkCache(
        fromCurrency: CurrencyEnum,
        toCurrency: CurrencyEnum,
    ): Promise<ConvertCurrencyType | undefined> {
        const cacheData = (await this.cacheService.get(
            `${fromCurrency}-${toCurrency}`,
        )) as ConvertCurrencyType

        if (cacheData) {
            console.log("From Cache")
            return cacheData
        }

        console.log("From axios")
        return undefined
    }
}
