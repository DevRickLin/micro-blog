import { StyleSheet, Text, View } from "react-native";
import { IComment } from "../types/blog.interface";

export const CommentCard = ({ comment } :{ comment:IComment }) => {
    return (
        <View style={styles.commentContent}>
           <Text>{comment.commentContent}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    commentContent: {
        marginTop: 5,
        minHeight: 100,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white"
    }    
})