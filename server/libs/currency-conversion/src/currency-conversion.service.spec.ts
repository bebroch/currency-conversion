import { Test, TestingModule } from "@nestjs/testing"
import { CurrencyApiService } from "./currency-api/currency-api.service"
import { CurrencyEnum } from "./currency-api/types/currency.enums"
import { CurrencyConversionService } from "./currency-conversion.service"

describe("CurrencyConversionService", () => {
    let service: CurrencyConversionService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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

    it("should be defined", async () => {
        expect(await service.convert(CurrencyEnum.USD, CurrencyEnum.AED, 2)).toEqual({
            currencyCode: "USD-AED",
            fromCurrency: "USD",
            toCurrency: "AED",
            value: 426,
        })
    })
})
