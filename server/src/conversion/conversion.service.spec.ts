import {
    CurrencyConversionModule,
    CurrencyConversionService,
} from "@currency-conversion/currency-conversion"
import { CurrencyEnum } from "@currency-conversion/currency-conversion/currency-api/types/currency.enums"
import { BadRequestException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { ConversionService } from "./conversion.service"

describe("ConversionService", () => {
    let service: ConversionService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CurrencyConversionModule],
            providers: [
                ConversionService,
                {
                    provide: CurrencyConversionService,
                    useValue: {
                        convert: (fromCurrency: CurrencyEnum, toCurrency: CurrencyEnum) => {
                            return {
                                fromCurrency,
                                toCurrency,
                                currencyCode: `${fromCurrency}-${toCurrency}`,
                                value: 12312,
                            }
                        },
                    },
                },
            ],
        }).compile()

        service = module.get<ConversionService>(ConversionService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("checking correct work method ConversionService", async () => {
        expect(await service.conversion(CurrencyEnum.AED, CurrencyEnum.BYN)).toEqual({
            fromCurrency: "AED",
            toCurrency: "BYN",
            currencyCode: "AED-BYN",
            value: 12312,
        })
    })

    it("check client error", async () => {
        // @ts-ignore
        await expect(service.conversion()).rejects.toThrow(BadRequestException)
    })
})
