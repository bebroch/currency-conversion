import { CurrencyEnum } from "../../../../common/currency"

export type DefaultCurrencyType = {
    from: CurrencyType
    to: CurrencyType
}

export type CurrencyType = {
    fetchUpdate: boolean
    currency: CurrencyEnum
    count: string
}
