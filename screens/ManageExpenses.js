import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, getExpense, storeExpense, updateExpense } from "../util/http";
import { formateDate, getDate } from "../util/date";
import LoadingOverLay from "../components/UI/LoadingOverlay";

export default function ManageExpenses({route, navigation}) {
     const [isSubmitting, setIsSubmitting] = useState(false);
    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);
   
    function deleteExpenseHandler() {
        setIsSubmitting(true);
        deleteExpense(editedExpenseId).then(() => {
            // setIsSubmitting(false);
            expensesCtx.deleteExpense(editedExpenseId);
        }).catch(error => {
            console.log('Delete error', error);
        });
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack(); // Go to that  wcreen which open this screen
    }

    function confirmHandler(expenseData) {
        setIsSubmitting(true);
        const data = {...expenseData, date: formateDate(expenseData.date)}
        if (isEditing) {
            data.id = editedExpenseId;
            updateExpense(data).then(resp => {
                const expense = {...resp.data, date: getDate(resp.data.date)}
                setIsSubmitting(false);
                console.log('confirmHandler update:', expense);
                expensesCtx.updateExpense(editedExpenseId, expense);
                navigation.goBack();
            }).catch(error => {
                console.log('update error', error);
            });
        } else {
            storeExpense(data).then(resp => {
                const expense = {...resp.data, date: getDate(resp.data.date)}
                setIsSubmitting(false);
                console.log('confirmHandler add:', expense);
                expensesCtx.addExpense(expense);
                navigation.goBack();
            }).catch(error => {
                console.log('post error', error);
            });
        }
    }

    const submitLabel = isEditing ? 'Update' : 'Add';
    if (isSubmitting) {
        return <LoadingOverLay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm onCancle={cancelHandler} onSubmit={confirmHandler} submitLabel={submitLabel} defaultValue={selectedExpense}/>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon='trash' 
                        color={GlobalStyles.colors.error500} size={36}
                        onPress={deleteExpenseHandler}/>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});

