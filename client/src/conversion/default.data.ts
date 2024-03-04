import { CurrencyEnum } from "../../../common/currency"
import { DefaultCurrencyType } from "./types/default.types"

export const defaultData = {
    from: {
        fetchUpdate: false,
        currency: CurrencyEnum.USD,
        count: "1",
    },
    to: {
        fetchUpdate: false,
        currency: CurrencyEnum.RUB,
        count: "0",
    },
} as DefaultCurrencyType
