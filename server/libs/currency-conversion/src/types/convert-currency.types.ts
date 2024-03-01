import { CurrencyEnum } from "@global-common/currency.enums"

export type ConvertCurrencyType = {
    fromCurrency: CurrencyEnum
    toCurrency: CurrencyEnum
    currencyCode: string
    value: number
}
