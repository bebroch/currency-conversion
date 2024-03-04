import { DefaultCurrencyType } from "../types/default.types"
import CurrencyApi from "./server-currency-api.class"

export default class UpdateCurrencyData extends CurrencyApi {
    public async updateData(
        data: DefaultCurrencyType,
        setData: (data: DefaultCurrencyType) => void,
    ) {
        const updateData = (key: string, count: string) => {
            const defaultData = {
                from: {
                    fetchUpdate: true,
                    currency: data.from.currency,
                },
                to: {
                    fetchUpdate: true,
                    currency: data.to.currency,
                },
            } as DefaultCurrencyType

            switch (key) {
                case "from":
                    setData({ ...defaultData, from: { ...defaultData.from, count } })
                    break
                case "to":
                    setData({ ...defaultData, to: { ...defaultData.to, count } })
                    break
            }
        }

        if (!data.from.fetchUpdate) {
            const response = await super.getCurrencyConversion({
                fromCount: data.from.count,
                fromCurrency: data.from.currency,
                toCurrency: data.to.currency,
            })

            updateData("to", response.value.toString())
        } else if (!data.to.fetchUpdate) {
            const response = await super.getCurrencyConversion({
                fromCount: data.to.count,
                fromCurrency: data.to.currency,
                toCurrency: data.from.currency,
            })

            updateData("from", response.value.toString())
        }
    }
}
