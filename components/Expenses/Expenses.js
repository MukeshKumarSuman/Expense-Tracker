import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
import { DUMMY_EXPENSES } from "../../constants/dummy-data";

export default function Expenses({expenses=DUMMY_EXPENSES, expensePeriod, fallbackText}) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }
  return (
    <View style={styles.conatiner}>
        <ExpensesSummary expensePeriod={expensePeriod} expenses={expenses}/>
        {content}
    </View>
  )
}
const styles = StyleSheet.create({
    conatiner: {
      flex: 1,
      paddingHorizontal: 8,
      paddingTop: 24,
      paddingBottom: 0,
      backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
      color: 'white',
      fontSize: 24,
      textAlign: 'center',
      marginTop: 32,
    }
});
