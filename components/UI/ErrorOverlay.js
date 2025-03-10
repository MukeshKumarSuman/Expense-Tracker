import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

export default function ErrorOverLay({message, onConfirm}) {
    return (
        <View style={styles.conatiner}>
        <Text style={[styles.text, styles.title]}>An Error occurred</Text>
        <Text style={styles.text}>{message}</Text>
        <Button onPress={onConfirm}>Okay</Button>
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
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'red',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});