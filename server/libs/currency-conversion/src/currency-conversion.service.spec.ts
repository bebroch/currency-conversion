import { Test, TestingModule } from "@nestjs/testing"
import { CurrencyEnum } from "./currency-api/types/currency.enums"
import { CurrencyConversionModule } from "./currency-conversion.module"
import { CurrencyConversionService } from "./currency-conversion.service"

describe("CurrencyConversionService", () => {
    let service: CurrencyConversionService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CurrencyConversionModule],
        }).compile()

        service = module.get<CurrencyConversionService>(CurrencyConversionService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("should be defined", async () => {
        expect(await service.convert(CurrencyEnum.USD, CurrencyEnum.AED)).toEqual({})
    })
})
