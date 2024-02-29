import { Test, TestingModule } from "@nestjs/testing"
import { CurrencyApiModule } from "./currency-api.module"
import { CurrencyApiService } from "./currency-api.service"
import { CurrencyEnum } from "./types/currency.enums"

describe("CurrencyConversionService", () => {
    let service: CurrencyApiService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CurrencyApiModule],
        }).compile()

        service = module.get<CurrencyApiService>(CurrencyApiService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("should be defined", async () => {
        const response = await service.latest(CurrencyEnum.USD, CurrencyEnum.RUB)
        expect(response).toHaveProperty("data")
        expect(response).toHaveProperty("meta")
    })
})
