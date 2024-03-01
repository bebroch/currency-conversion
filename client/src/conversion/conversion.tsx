import { CurrencyEnum } from "../../../common/currency.enums";
import CurrencyForm from "./components/currency-form";
import styles from "./conversion.module.css";
import { ConvertCurrencyType } from "../../../server/libs/currency-conversion/src/types/convert-currency.types.ts";
import { useEffect, useState } from "react";

function Conversion() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [fromCount, setFromCount] = useState("1");
    const [fromCurrency, setFromCurrency] = useState(CurrencyEnum.USD);
    const [toCount, setToCount] = useState("0");
    const [toCurrency, setToCurrency] = useState(CurrencyEnum.RUB);

    const dataTEST = useState(
        `http://localhost:5000/conversion?count=${fromCount}&from-currency=${fromCurrency}&to-currency=${toCurrency}`,
    );

    console.log(dataTEST, fromCount, fromCurrency, toCount, toCurrency);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Выполнение запроса к серверу
            const response = await fetch(
                `http://localhost:5000/conversion?count=${fromCount}&from-currency=${fromCurrency}&to-currency=${toCurrency}`,
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Получение данных в формате JSON
            const jsonData = await response.json();
            // Обновление состояния с полученными данными
            setData(jsonData);
        } catch (error) {
            // Обработка ошибок
            setError(error as React.SetStateAction<null>);
        } finally {
            // Установка состояния загрузки в false после завершения запроса
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fromCount]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error || !data || !("value" in data)) {
        return (
            <div className={styles.main}>
                <div className={styles.title}>
                    <h1>Обмен валют</h1>
                </div>
                <table className={styles.tableStyle}>
                    <tr>
                        <td>
                            <h3>Я хочу продать</h3>
                            <CurrencyForm
                                count={fromCount}
                                currency={fromCurrency}
                                onChangeCount={setFromCount}
                                onChangeCurrency={setFromCurrency}
                            />
                        </td>
                        <td>
                            <h3>Я хочу получить</h3>
                            <CurrencyForm
                                count="0"
                                currency={toCurrency}
                                onChangeCount={setToCount}
                                onChangeCurrency={setToCurrency}
                            />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

    // Отображение полученных данных
    //(data as ConvertCurrencyType).value.toString()
    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h1>Обмен валют</h1>
            </div>
            <table className={styles.tableStyle}>
                <tr>
                    <td>
                        <h3>Я хочу продать</h3>
                        <CurrencyForm
                            count={fromCount}
                            currency={fromCurrency}
                            onChangeCount={setFromCount}
                            onChangeCurrency={setFromCurrency}
                        />
                    </td>
                    <td>
                        <h3>Я хочу получить</h3>
                        <CurrencyForm
                            count={(
                                data as ConvertCurrencyType
                            ).value.toString()}
                            currency={toCurrency}
                            onChangeCount={setToCount}
                            onChangeCurrency={setToCurrency}
                        />
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default Conversion;
