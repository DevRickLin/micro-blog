import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native"
import { findComments } from "../api";
import { CommentCard } from "../components/CommentCard";
import { IComment } from "../types/blog.interface";
import { NormalStackParamList, NormalStackScreenProps } from "../types/navigator.type"

export const BlogScreen = ({ route, navigation }:NormalStackScreenProps<'Blog'>) => {

    const { blogContent, blogID } = route.params as NormalStackParamList['Blog'];

    const [commentsList, setCommentsList] = useState([] as IComment[]);

    useEffect(()=>{
        findComments(blogID).then( comments => setCommentsList(comments) );
    },[]);

    return (
        <View>
            <View style={styles.blogContainer}>
                <Text style={styles.blogContent}>{blogContent}</Text>
                <View style={styles.controlArea}>
                    <Button title="评论" onPress={()=>navigation.navigate('Input', { mode: 'comment', blogID })}></Button>
                </View>
            </View>
            <ScrollView>
                {commentsList.map( comment => <CommentCard 
                    key={comment.commentID}
                    comment={comment}
                    />)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    blogContainer: {
        minHeight: 200,
        height: "30%"
        
    },
    blogContent: {
        height: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    controlArea: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "white"
    }
});