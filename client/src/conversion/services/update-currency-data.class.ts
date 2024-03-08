import { DefaultCurrencyType } from "../types/default.types"
import CurrencyApi from "./server-currency-api.class"

export default class UpdateCurrencyData extends CurrencyApi {
    public async updateData(
        data: DefaultCurrencyType,
    ): Promise<["from" | "to", data: string] | undefined> {
        if (!data.from.fetchUpdate) {
            const response = await super.getCurrencyConversion({
                fromCount: data.from.count,
                fromCurrency: data.from.currency,
                toCurrency: data.to.currency,
            })

            return ["to", response.value.toString()]
        } else if (!data.to.fetchUpdate) {
            const response = await super.getCurrencyConversion({
                fromCount: data.to.count,
                fromCurrency: data.to.currency,
                toCurrency: data.from.currency,
            })

            return ["from", response.value.toString()]
        }

        return undefined
    }
}
