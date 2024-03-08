import axios from "axios"
import { ConvertCurrencyType, CurrencyEnum } from "../types/server.types"

export default class CurrencyApi {
    public async getCurrencyConversion({
        fromCount,
        fromCurrency,
        toCurrency,
    }: {
        fromCount: string
        fromCurrency: CurrencyEnum
        toCurrency: CurrencyEnum
    }): Promise<ConvertCurrencyType> {
        return (
            await axios.get(
                `http://localhost:5000/conversion?count=${fromCount}&from-currency=${fromCurrency}&to-currency=${toCurrency}`,
            )
        ).data
    }
}
