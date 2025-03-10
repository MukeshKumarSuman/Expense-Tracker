import { useContext } from "react";
import Expenses from "../components/Expenses/Expenses";
import { ExpensesContext } from "../store/expenses-context";

export default function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    return <Expenses expensePeriod="Total" expenses={expensesCtx.expenses} 
    fallbackText='No register expenses found.'/>
}