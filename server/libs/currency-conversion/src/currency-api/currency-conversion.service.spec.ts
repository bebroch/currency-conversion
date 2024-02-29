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
        expect(await service.latest(CurrencyEnum.USD, CurrencyEnum.RUB)).toEqual({
            data: {
                RUB: {
                    code: "RUB",
                    value: 91.3951307443,
                },
            },
            meta: {
                last_updated_at: "2024-02-28T23:59:59Z",
            },
        })
    })
})
