import { CurrencyEnum } from "./server.types"

export type DefaultCurrencyType = {
    from: CurrencyType
    to: CurrencyType
}

export type CurrencyType = {
    count: string
    currency: CurrencyEnum
    fetchUpdate: boolean
}
