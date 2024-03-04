import { useState, useEffect } from "react"
import CurrencyInput from "./components/CurrencyInput"
import LoadStatusSection from "./components/LoadStatusSection"
import { defaultData } from "./default.data"
import UpdateCurrencyData from "./services/update-currency-data.class"
import styles from "./Conversion.module.css"

const updateCurrencyData = new UpdateCurrencyData()

export function Conversion() {
    const [data, setData] = useState(defaultData)
    const [load, setLoadStatus] = useState(true)

    useEffect(() => {
        if (!data.from.fetchUpdate || !data.to.fetchUpdate) {
            setLoadStatus(true)
            const fetchData = async () => {
                await updateCurrencyData.updateData(data, setData)
                setLoadStatus(false)
            }

            fetchData()
        }
    }, [data.from.fetchUpdate, data.to.fetchUpdate])

    if (load) return LoadStatusSection()

    return (
        <div style={{ display: "grid", placeItems: "center" }}>
            <div className={styles.currencyMain}>
                <CurrencyInput
                    name="from"
                    value={data.from.count}
                    onChange={(count: string) =>
                        setData({ ...data, from: { ...data.from, count, fetchUpdate: false } })
                    }
                >
                    Я хочу продать
                </CurrencyInput>
                <CurrencyInput
                    name="to"
                    value={data.to.count}
                    onChange={(count: string) =>
                        setData({ ...data, to: { ...data.to, count, fetchUpdate: false } })
                    }
                >
                    Я хочу получить
                </CurrencyInput>
            </div>
        </div>
    )
}
