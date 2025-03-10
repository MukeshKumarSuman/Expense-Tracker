import { useContext, useEffect, useState } from "react";
import Expenses from "../components/Expenses/Expenses"
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverLay from "../components/UI/LoadingOverlay";
import ErrorOverLay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        async function getExpenses() {
            try {
                const expenses = await fetchExpenses();
                console.log('RecentExpenses fetch from db', expenses);
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could Not fetch expenses');
            }
            setIsFetching(false);
            
        }
        getExpenses()
    }, []);
    const date7DaysAgo = getDateMinusDays(7);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        return expense.date.isAfter(date7DaysAgo);
    });

    function errorHandler() {
        setError(null);
    }

    if (error) {
        return <ErrorOverLay message={error} onConfirm={errorHandler}/>
    }

    if (isFetching) {
        return <LoadingOverLay />
    }
    return <Expenses expensePeriod='Last 7 Days' expenses={recentExpenses} 
    fallbackText='No expenses register for last 7 days!.'/>
}