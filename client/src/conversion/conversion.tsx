import { useState, useEffect } from "react"
import CurrencyInput from "./components/CurrencyInput/CurrencyInput"
import UpdateCurrencyData from "./services/update-currency-data.class"
import styles from "./Conversion.module.css"
import { DefaultCurrencyType } from "./types/default.types"
import { CurrencyEnum } from "./types/server.types"

const updateCurrencyData = new UpdateCurrencyData()

export function Conversion() {
    // const [data, setData] = useState(defaultData)

    const [fromValue, setFromValue] = useState("1")
    const [fromCurrency, setFromCurrency] = useState(CurrencyEnum.USD)
    const [fromFetchData, setFromFetchData] = useState(false)

    const [toValue, setToValue] = useState("")
    const [toCurrency, setToCurrency] = useState(CurrencyEnum.RUB)
    const [toFetchData, setToFetchData] = useState(true)

    console.log(
        "Данные в начале функции (from-to):",
        [fromValue, fromCurrency, fromFetchData],
        [toValue, toCurrency, toFetchData],
    )

    useEffect(() => {
        const fetchData = async () => {
            console.log(
                "Данные в fetch (from-to):",
                [fromValue, fromCurrency, fromFetchData],
                [toValue, toCurrency, toFetchData],
            )

            const [key, value] =
                (await updateCurrencyData.updateData({
                    from: { count: fromValue, currency: fromCurrency, fetchUpdate: fromFetchData },
                    to: { count: toValue, currency: toCurrency, fetchUpdate: toFetchData },
                })) || []

            console.log([key, value])
            if (key && value) {
                setFromFetchData(true)
                setToFetchData(true)
                switch (key) {
                    case "from":
                        setFromValue(value)
                        break
                    case "to":
                        setToValue(value)
                        break
                }
            }
        }

        console.log(
            fromFetchData,
            toFetchData,
            (!fromFetchData && toFetchData) || (fromFetchData && !toFetchData),
        )

        if ((!fromFetchData && toFetchData) || (fromFetchData && !toFetchData)) fetchData()
    }, [fromFetchData, toFetchData])

    const changeData = (
        key: keyof DefaultCurrencyType,
        { count, currency }: { count?: string; currency?: CurrencyEnum },
    ) => {
        switch (key) {
            case "from":
                if (count) {
                    setFromValue(count)
                    setFromFetchData(false)
                }
                if (currency) {
                    setFromCurrency(currency)
                }
                break
            case "to":
                if (count) {
                    setToValue(count)
                    setToFetchData(false)
                }
                if (currency) {
                    setToCurrency(currency)
                }
                break
        }
    }

    return (
        <div className={styles.currencyBlock}>
            <div className={styles.currencyMain}>
                <CurrencyInput
                    name="from"
                    value={fromValue}
                    currency={fromCurrency}
                    onChange={({ count, currency }: { count?: string; currency?: CurrencyEnum }) =>
                        changeData("from", { count, currency })
                    }
                >
                    Я хочу продать
                </CurrencyInput>
                <CurrencyInput
                    name="to"
                    value={toValue}
                    currency={toCurrency}
                    onChange={({ count, currency }: { count?: string; currency?: CurrencyEnum }) =>
                        changeData("to", { count, currency })
                    }
                >
                    Я хочу получить
                </CurrencyInput>
            </div>
        </div>
    )
}
