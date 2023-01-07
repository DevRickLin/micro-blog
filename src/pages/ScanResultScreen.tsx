import { StyleSheet, Text, View } from "react-native";
import { ScanStackScreenProps } from "../types/navigator.type";

export function ScanResultScreen(props: ScanStackScreenProps<'Result'>) {
    if (!props.route.params) {
        return <View>
            <Text>QR Code 格式错误或网路问题</Text>
        </View>
    }

    const { expressName, expressAddress, expressPhone } = props.route.params;

    return <View style={styles.container}>
        <Text style={styles.text}>{expressName}</Text>
        <Text style={styles.text}>{expressAddress}</Text>
        <Text style={styles.text}>{expressPhone}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})