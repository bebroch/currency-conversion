import { CurrencyEnum } from "@global-common/currency.enums"

export type LatestType = {
    data: Record<CurrencyEnum, CurrencyType>
    meta: {
        last_updated_at: string | Date
    }
}

export type CurrencyType = {
    code: CurrencyEnum
    value: number
}
