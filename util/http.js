import axios from "axios";
import { getDate } from "./date";

const BASE_URL = 'https://07da-2406-7400-56-9cd5-149b-4976-fe6f-5a99.ngrok-free.app/expensetracker';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export function storeExpense(expenseData) {
    // return axios.post('http://192.168.0.106:8080/expensetracker/expensetracker/add', expenseData);
    return axiosInstance.post('/add', expenseData);
}

export async function fetchExpenses() {
    // return axios.get('http://192.168.0.106:8080/expensetracker');
    const resposne = await axiosInstance.get('/expenses');
    const expenses = resposne.data.map( expense => {
        return {...expense, date: getDate(expense.date)}
    }).sort( (r1, r2) => r1.date.isAfter(r2.date) ? -1 : 1);
    return expenses;
}

export function updateExpense(expenseData) {
    return axiosInstance.put("/update", expenseData);
}

export function deleteExpense(id) {
    return axiosInstance.delete(`/${id}`);
}