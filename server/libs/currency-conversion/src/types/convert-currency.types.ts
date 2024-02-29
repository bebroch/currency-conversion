import { CurrencyEnum } from "../currency-api/types/currency.enums"

export type ConvertCurrencyType = {
    fromCurrency: CurrencyEnum
    toCurrency: CurrencyEnum
    currencyCode: string
    value: number
}
