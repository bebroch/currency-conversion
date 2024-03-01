import { CurrencyEnum } from "@global-common/currency.enums"
import styles from "./currency-form.module.css"

const options = Object.keys(CurrencyEnum).map((key) => <option key={key}>{key}</option>)

function CurrencyForm({
    count = "",
    currency,
    onChangeCount,
    onChangeCurrency,
}: {
    count?: string
    currency?: CurrencyEnum
    onChangeCount: (count: string) => void
    onChangeCurrency: (currency: CurrencyEnum) => void
}) {
    return (
        <>
            <input
                type="number"
                min="0"
                className={styles.numberStyle}
                value={count}
                onChange={(e) => onChangeCount(e.target.value)}
            />

            <select
                className={styles.currency}
                value={currency || CurrencyEnum.USD}
                onChange={(e) => onChangeCurrency(e.target.value as CurrencyEnum)}
            >
                {options}
            </select>
        </>
    )
}

export default CurrencyForm
