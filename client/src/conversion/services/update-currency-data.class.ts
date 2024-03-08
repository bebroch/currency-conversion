import { DefaultCurrencyType } from "../types/default.types"
import CurrencyApi from "./server-currency-api.class"

export default class UpdateCurrencyData extends CurrencyApi {
    public async updateData(
        data: DefaultCurrencyType,
    ): Promise<["from" | "to", data: string] | undefined> {
        // const updateData = (key: string, count: string) => {
        //     return ["to", count]

        //     const defaultData = {
        //         from: {
        //             ...data.from,
        //             fetchUpdate: true,
        //         },
        //         to: {
        //             ...data.to,
        //             fetchUpdate: true,
        //         },
        //     } as DefaultCurrencyType

        //     switch (key) {
        //         case "from":
        //             console.log({ ...defaultData, from: { ...defaultData.from, count } })
        //             setData({ ...defaultData, from: { ...defaultData.from, count } })
        //             return ["from", count]
        //             break
        //         case "to":
        //             console.log({ ...defaultData, to: { ...defaultData.to, count } })
        //             setData({ ...defaultData, to: { ...defaultData.to, count } })
        //             return ["to", count]
        //             break
        //     }
        // }

        if (!data.from.fetchUpdate) {
            const response = await super.getCurrencyConversion({
                fromCount: data.from.count,
                fromCurrency: data.from.currency,
                toCurrency: data.to.currency,
            })

            // console.log(1, data.from)
            // updateData("to", response.value.toString())
            return ["to", response.value.toString()]
        } else if (!data.to.fetchUpdate) {
            const response = await super.getCurrencyConversion({
                fromCount: data.to.count,
                fromCurrency: data.to.currency,
                toCurrency: data.from.currency,
            })

            // console.log(2)
            // updateData("from", response.value.toString())
            return ["from", response.value.toString()]
        }

        return undefined
    }
}
