import moment from "moment";
import { getDateMinusDays } from "../util/date";

export const DUMMY_EXPENSES = [
    {id: 'e1', description: 'A pair of shose', amount: 59.99, date: moment('2025-01-19')},
    {id: 'e2', description: 'A pair of books', amount: 89.99, date: moment('2025-01-25')},
    {id: 'e3', description: 'A pair of pen', amount: 79.99, date: moment('2025-02-18')},
    {id: 'e4', description: 'A pair of trousers', amount: 29.99, date: moment('2025-02-25')},
    {id: 'e5', description: 'A pair of shose', amount: 59.99, date: moment('2025-01-19')},
    {id: 'e6', description: 'A pair of books', amount: 89.99, date: moment('2025-01-25')},
    {id: 'e7', description: 'A pair of pen', amount: 79.99, date: moment('2025-02-18')},
    {id: 'e8', description: 'A pair of trousers', amount: 29.99, date: moment('2025-02-25')},
    {id: 'e9', description: 'A pair of books', amount: 89.99, date: moment('2025-01-25')},
    {id: 'e10', description: 'A pair of pen', amount: 79.99, date: getDateMinusDays(2)},
    {id: 'e11', description: 'A pair of tabs', amount: 29.99, date: getDateMinusDays(4)},
  ];