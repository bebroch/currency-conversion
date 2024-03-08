import { CurrencyEnum } from "../../../common/currency"
import { DefaultCurrencyType } from "./types/default.types"

export const defaultData = {
    from: {
        fetchUpdate: false,
        currency: CurrencyEnum.USD,
        count: "1",
    },
    to: {
        fetchUpdate: true,
        currency: CurrencyEnum.RUB,
        count: "",
    },
} as DefaultCurrencyType
