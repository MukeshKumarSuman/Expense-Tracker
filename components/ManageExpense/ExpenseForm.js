import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import Button from "../UI/Button";
import { formateDate, getDate, getSystemDateFormat } from "../../util/date";

export default function ExpenseForm({submitLabel, onCancle, onSubmit, defaultValue}) {
    // user input always will be a string.
    const [inputValue, setInputValue] = useState({
        amount: {value: defaultValue ? defaultValue.amount.toString() : '', isValid: true},
        date: {value: defaultValue ? formateDate(defaultValue.date, 'YYYY-MM-DD') : '', isValid: true},
        description: {value: defaultValue ? defaultValue.description : '', isValid: true},
    });
    function inputhangeHandler(inputIdentifier, enteredValue) {
       setInputValue((currentInputValue) => {
        return {...currentInputValue, [inputIdentifier]: {value: enteredValue, isValid: true}};
       });
    }
    function submitHandler() {
       const expenseData = {
        amount: +inputValue.amount.value, // + will conver text number to number
        date: getDate(inputValue.date.value, 'YYYY-MM-DD'),
        description: inputValue.description.value,
       }; 
       const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
       const dateIsValid = expenseData.date.isValid(); // we areing moment
       const descriptionIsValid = expenseData.description.trim().length > 0;
       if (!amountIsValid  || !dateIsValid || !descriptionIsValid) {
        // Alert.alert('Input is Invalid!');
        setInputValue((currentValue) => {
            return {
                amount: {...currentValue.amount, isValid: amountIsValid},
                date: {...currentValue.date, isValid: dateIsValid},
                description: {...currentValue.description, isValid: descriptionIsValid},
            }
        });
            return;
       }
       onSubmit(expenseData);
     }
    const formIsInavlid = !inputValue.amount.isValid || !inputValue.date.isValid || !inputValue.description.isValid;
    return (
        <View style={styles.form}>
            <Text style={styles.text}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input label='Amount' invalid={!inputValue.amount.isValid} style={styles.rowInput} 
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputhangeHandler.bind(this, 'amount'),
                    value: inputValue.amount.value,
                }}/>
                <Input label='Date' invalid={!inputValue.date.isValid} style={styles.rowInput} 
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputhangeHandler.bind(this, 'date'),
                    value: inputValue.date.value,
                }}/>
            </View>
            <Input label='Description' invalid={!inputValue.description.isValid} 
            textInputConfig={{
                multiline: true,
                //autoCorrect: false // default true
                // autoCapitalize: 'none'
                onChangeText: inputhangeHandler.bind(this, 'description'),
                value: inputValue.description.value,
            }}/>
            {formIsInavlid && <Text style={styles.errorText}>Invalid inputs!</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancle}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitLabel}</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 18,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    text: {
        color: GlobalStyles.colors.primary100,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomWidth: 2,
        borderColor: GlobalStyles.colors.primary100,
        marginVertical: 24,
        paddingBottom: 8,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 10
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
        fontSize: 18
    }
});