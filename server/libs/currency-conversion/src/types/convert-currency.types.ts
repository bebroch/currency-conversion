import { CurrencyEnum } from "../apis/currency-api/enums/currency.enums"

export type ConvertCurrencyType = {
    fromCurrency: CurrencyEnum
    toCurrency: CurrencyEnum
    currencyCode: string
    value: number
}
