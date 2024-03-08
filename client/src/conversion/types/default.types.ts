import { CurrencyEnum } from "../../../../common/currency"

export type DefaultCurrencyType = {
    from: CurrencyType
    to: CurrencyType
}

export type CurrencyType = {
    count: string
    currency: CurrencyEnum
    fetchUpdate: boolean
}
