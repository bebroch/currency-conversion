import { CacheModule } from "@cache/cache"
import { Test, TestingModule } from "@nestjs/testing"
import { CurrencyApiService } from "./apis/currency-api/currency-api.service"
import { CurrencyEnum } from "./apis/currency-api/enums/currency.enums"
import { CurrencyConversionService } from "./currency-conversion.service"

describe("CurrencyConversionService", () => {
    let service: CurrencyConversionService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CacheModule],
            providers: [
                CurrencyConversionService,
                {
                    provide: CurrencyApiService,
                    useValue: {
                        latest: (base_currency: CurrencyEnum, currencies: CurrencyEnum) => {
                            return {
                                data: {
                                    [currencies]: {
                                        code: `${currencies}`,
                                        value: 213,
                                    },
                                },
                                meta: {
                                    last_updated_at: new Date(),
                                },
                            }
                        },
                    },
                },
            ],
            exports: [CurrencyConversionService],
        }).compile()

        service = module.get<CurrencyConversionService>(CurrencyConversionService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("should be equal", async () => {
        expect(await service.getExchangeRate(CurrencyEnum.USD, CurrencyEnum.AED)).toEqual({
            currencyCode: "USD-AED",
            fromCurrency: "USD",
            toCurrency: "AED",
            value: 213,
        })
    })

    it("test cache service", async () => {
        expect(await service.getExchangeRate(CurrencyEnum.USD, CurrencyEnum.AED)).toEqual({
            currencyCode: "USD-AED",
            fromCurrency: "USD",
            toCurrency: "AED",
            value: 213,
        })

        // check console
        expect(await service.getExchangeRate(CurrencyEnum.USD, CurrencyEnum.AED)).toEqual({
            currencyCode: "USD-AED",
            fromCurrency: "USD",
            toCurrency: "AED",
            value: 213,
        })

        expect(await service.getExchangeRate(CurrencyEnum.AED, CurrencyEnum.USD)).toEqual({
            currencyCode: "AED-USD",
            fromCurrency: "AED",
            toCurrency: "USD",
            value: 213,
        })
    })
})
