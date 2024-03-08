export type ConvertCurrencyType = {
    fromCurrency: CurrencyEnum
    toCurrency: CurrencyEnum
    currencyCode: string
    value: number
}

export enum CurrencyEnum {
    USD = "USD",
    RUB = "RUB",
    EUR = "EUR",
    CNY = "CNY",
    TRY = "TRY",
    BYN = "BYN",
    KZT = "KZT",
    AED = "AED",
    GBP = "GBP",
    PLN = "PLN",
    SGD = "SGD",
    CZK = "CZK",
    SEK = "SEK",
    NOK = "NOK",
    CAD = "CAD",
    CHF = "CHF",
    DKK = "DKK",
    JPY = "JPY",
    HKD = "HKD",
}
