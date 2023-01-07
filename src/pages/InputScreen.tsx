import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View, PlatformColor } from "react-native"
import { addBlog, addComment } from "../api"
import { AppContext } from "../context/app"
import { NormalStackParamList, NormalStackScreenProps } from "../types/navigator.type"

export const InputScreen = (props: NormalStackScreenProps<'Input'>) => {

    const { mode, blogID } = props.route.params as NormalStackParamList['Input'];

    const [text, setText] = useState("");

    const useOnPressHandler = (userID?: number) => () => {
        if (!userID) {
            return;
        }
        if (mode === 'blog') {
            addBlog(userID, text)
                .then( res => console.log(res) )
                .then( () => props.navigation.goBack() )
                .catch( err => console.log(err) );
            return;
        }
        if (mode === 'comment' && blogID) {
            addComment(userID, blogID, text)
                .then( res => console.log(res) )
                .then( () => props.navigation.goBack() )
                .catch( err => console.log(err) );
            return;
        }
    }

    return <View>
        <TextInput style={styles.inputArea} placeholder="写点东西..." onChangeText={setText} />
        <View style={styles.controlArea}>
            <AppContext.Consumer>
                {
                    ({ state }) =>
                        <TouchableOpacity style={styles.sendButton} onPress={useOnPressHandler(state.userID)}>
                            <Text style={{ color: "white" }}>发送{
                                mode === 'blog'? '博客' : '评论'
                            }</Text>
                        </TouchableOpacity>
                }
            </AppContext.Consumer>
        </View>
    </View>
}

const styles = StyleSheet.create({
    controlArea: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "white"
    },
    sendButton: {
        margin: 10,
        padding: 10,
        backgroundColor: PlatformColor('@android:color/holo_blue_light'),
        borderRadius: 16
    },
    inputArea: {
        height: "80%",
        padding: 20,
        backgroundColor: "white",
    }
})