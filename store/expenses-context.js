import { createContext, useReducer } from "react";
import { DUMMY_EXPENSES as initialState } from "../constants/dummy-data";

export const ExpensesContext = createContext({
    // shape of the context
    expenses: [],
    setExpenses: (expenses) => {},
    addExpense: ({description, amount, date}) => {},
    updateExpense: (id) => {},
    deleteExpense: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'SET' : return action.payload;
        case 'ADD': 
            return [{...action.payload}, ...state];
        case 'UPDATE': 
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE': return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

export default function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function setExpenses(expenses) {
        dispatch({type: 'SET', payload: expenses});
    }

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}