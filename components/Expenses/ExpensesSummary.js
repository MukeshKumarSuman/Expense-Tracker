import { FlatList, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";


export default function ExpensesSummary({expensePeriod, expenses}) {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0); // starting value of sum is 2nd arg i.e 0.
  return (
    <View style={styles.conatiner}>
        <Text style={styles.periexpensePeriod}>{expensePeriod}</Text>
        <Text style={styles.sum}>Rs. {expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
    },
    periexpensePeriod: {
        fontSize: 16,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    }
});