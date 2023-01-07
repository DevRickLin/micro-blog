import React, { SetStateAction, useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { login } from "../api";
import { RootStackScreenProps } from "../types/navigator.type";
import { AppContext } from "../context/app";
import { IAPPState } from "../types/app.inferface";

export const LoginScreen = ({ navigation, route }: RootStackScreenProps) => {

    const [form, setForm] = useState({} as { user?: string, pwd?: string });

    const useOnPressHandler = (state: IAPPState,setState: React.Dispatch<SetStateAction<IAPPState>> | null) => async () => {        
        if (state.isLogin) {
            navigation.navigate('Normal');
        }
        
        if (!form.user || !form.pwd) {
            return;
        }
        try {
            const { userID, userName } = await login(Number(form.user), form.pwd);
            if (setState !== null) {
                setState({
                    ...state,
                    isLogin: true,
                    userID,
                    userName
                })
            }
            navigation.navigate('Normal');
        } catch (err) {
            console.log(err);
        }
    }

    return <View style={styles.container}>
        <Text>帐号</Text>
        <TextInput style={styles.input} onChangeText={text => setForm({ ...form ,user: text })}></TextInput>
        <Text>密码</Text>
        <TextInput style={styles.input} onChangeText={text => setForm({ ...form, pwd: text })}></TextInput>
        <AppContext.Consumer>
            {({ state, setState }) => <Button title="登入" onPress={useOnPressHandler(state,setState)}></Button>}
        </AppContext.Consumer>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 50,
        justifyContent: "center",
        alignItems: "stretch"
    },
    input: {
        marginBottom: 10,
        backgroundColor: "white"
    }
})