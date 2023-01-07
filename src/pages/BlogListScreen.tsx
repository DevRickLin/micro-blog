import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { addBlog, findBlogs } from "../api";
import { BlogCard } from "../components/BlogCard";
import { IBlog } from "../types/blog.interface";
import type { NormalStackParamList, NormalStackScreenProps } from "../types/navigator.type";

export const BlogListScreen = ({ navigation }:NormalStackScreenProps<'BlogList'>) => { 

    const [blogList, setBlogList] = useState([] as IBlog[]);

    useEffect(()=>{
        findBlogs(0,2).then( blogs => setBlogList(blogs) );
    },[]);

    return (
        <View>
            <ScrollView style={styles.listContainer}
            >
                {blogList.map((blog,i) => <BlogCard 
                    key={i} 
                    content={blog.blogContent}
                    onPressHandler={()=>navigation.navigate('Blog',blog)}
            />)}
            </ScrollView>
            <FloatingAction
                onPressMain={()=>navigation.navigate('Input', { mode: 'blog' })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  listContainer: {
    height: "100%"
  }
})