import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'native-base';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';
import {findBlogs} from '../api';
import {BlogCard} from '../components/BlogCard';
import {IBlog} from '../types/blog.interface';
import type {NormalStackScreenProps} from '../types/navigator.type';

export const BlogListScreen = ({
  navigation,
}: NormalStackScreenProps<'BlogList'>) => {
  const [blogList, setBlogList] = useState([] as IBlog[]);
  const isFocused = useIsFocused();

  useEffect(() => {
    findBlogs(0, 100).then(blogs => setBlogList(blogs));
  }, [isFocused]);

  const actions = [
    {
      text: '发表微博',
      icon: <Icon name={'rss'} color={'white'} />,
      name: 'addBlog',
      position: 1,
    },
  ];

  return (
    <View>
      <ScrollView style={styles.listContainer}>
        {blogList.reverse().map((blog, i) => (
          <BlogCard
            key={i}
            blog={blog}
            onPressHandler={() => navigation.navigate('Blog', blog)}
          />
        ))}
      </ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={() => {
          navigation.navigate('Input', {mode: 'blog'});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: '100%',
  },
});
