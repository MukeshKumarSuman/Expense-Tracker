import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';


export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  function ExpensesOverView() {
    return (
      <BottomTabs.Navigator screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500}, // top header
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500}, //Bottom header
        tabBarActiveBackgroundColor: GlobalStyles.colors.primary500,
        headerRight: ({size, tintColor}) => <IconButton icon='add' color={tintColor}
         size={size} onPress={() => navigation.navigate('ManageExpense')}/> 
      })}>
        <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={{
          title: 'Recent Expenses', // Top header
          tabBarLabel: 'Recent', // Bottom header
          tabBarIcon: ({color, size}) => (
            <Ionicons name='hourglass' size={size} color={color}/>
          ),
        }}/>
        <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({color, size}) => (
            <Ionicons name='calendar' size={size} color={color}/>
          ),
        }}/>
      </BottomTabs.Navigator>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500}, // top header
            headerTintColor: 'white',
          }}>
            <Stack.Screen name='ExpensesOverView' component={ExpensesOverView} options={{
              headerShown: false,
            }}/>
            <Stack.Screen name='ManageExpense' component={ManageExpenses} options={{
              presentation: 'modal', // for iOS only.
          }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
