import { ReactNode } from "react"
import { CurrencyEnum } from "../../../../../common/currency"
import styles from "./CurrencyInput.module.css"

export default function CurrencyInput({
    children,
    name,
    value,
    currency,
    onChange,
}: {
    children: ReactNode
    name: string
    value: string
    currency: CurrencyEnum
    onChange: ({ count, currency }: { count?: string; currency?: CurrencyEnum }) => void
}) {
    return (
        <div className={styles.inputBlock}>
            <label className={styles.labelValueCurrency} htmlFor={name}>
                {children}
            </label>
            <div className={styles.inputWithSectionBlock}>
                <input
                    className={styles.inputValueCurrency}
                    value={value}
                    id={name}
                    type="number"
                    min="0"
                    onChange={(e) => onChange({ count: e.target.value })}
                />
                <select
                    className={styles.selectionCurrency}
                    value={currency}
                    onChange={(e) => onChange({ currency: e.target.value as CurrencyEnum })}
                >
                    {Object.keys(CurrencyEnum).map((item) => {
                        return (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
