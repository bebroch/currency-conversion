import { Injectable } from "@nestjs/common"
import axios from "axios"
import { LatestType } from "./types/currency-latest.types"
import { CurrencyEnum } from "./types/currency.enums"

@Injectable()
export class CurrencyApiService {
    private apiKey: string

    constructor() {
        // TODO: Выделить api key в env
        //  "cur_live_eJrCeNQ6u4HPoB2MYVWgpneMYDDVisVmZnHLcZH9"

        this.apiKey = "cur_live_eJrCeNQ6u4HPoB2MYVWgpneMYDDVisVmZnHLcZH9"
    }

    public async latest(
        base_currency: CurrencyEnum,
        currencies: CurrencyEnum,
    ): Promise<LatestType | null> {
        try {
            return (
                await axios(
                    `https://api.currencyapi.com/v3/latest?apikey=${this.apiKey}&base_currency=${base_currency}&currencies=${currencies}`,
                )
            ).data
        } catch (err) {
            return null
        }
    }
}
