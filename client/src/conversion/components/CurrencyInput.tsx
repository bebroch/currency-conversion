import { ReactNode } from "react"

export default function CurrencyInput({
    children,
    name,
    value,
    onChange,
}: {
    children: ReactNode
    name: string
    value: string
    onChange: (count: string) => void
}) {
    return (
        <div>
            <label htmlFor={name}>{children}</label>
            <input
                value={value}
                name={name}
                type="number"
                min="0"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
