import { Button, Image, StyleSheet, Text, View } from "react-native";
import { TabScreenProps } from "../types/navigator.type";
import { AppContext } from "../context/app";

export const MyScreen = (props: TabScreenProps) => (
    <View style={styles.container}>
        <Image style={styles.avatar} source={require("../../assets/avatar.png")}></Image>
        <AppContext.Consumer>
        {({state})=><Text style={styles.userName}>{state.userName}</Text>}
        </AppContext.Consumer>
        <View style={styles.buttonContainer}>
            <Button title="登出" onPress={()=>props.navigation.navigate('Login')}></Button>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    avatar: {
        width: 200,
        height: 200
    },
    userName: {
        fontSize: 70
    },
    buttonContainer: {
        padding: 20
    }
})