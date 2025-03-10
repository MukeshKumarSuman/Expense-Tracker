import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function LoadingOverLay() {
    return(
        <View style={styles.conatiner}>
            <ActivityIndicator size="large" color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    }
});