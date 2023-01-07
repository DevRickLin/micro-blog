import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { IBlog } from "../types/blog.interface";

export const BlogCard = ({ content, onPressHandler }:{ content: IBlog['blogContent'], onPressHandler: ()=>void }) => {

    return (
    <TouchableNativeFeedback onPress={onPressHandler}> 
        <View style={styles.container}>
            <Text>{content}</Text>
        </View>
    </TouchableNativeFeedback>)
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: 'white'
    }
})