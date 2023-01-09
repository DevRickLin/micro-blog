import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppContext} from '../context/app';
import {IBlog} from '../types/blog.interface';
import {getUserById} from '../utils';
import {MockAvatar} from './Avatar';

export const BlogCard = ({
  blog,
  onPressHandler,
}: {
  blog: IBlog;
  onPressHandler: () => void;
}) => {
  return (
    <TouchableNativeFeedback onPress={onPressHandler}>
      <View style={styles.container}>
        <View style={styles.content}>
          <MockAvatar style={styles.avatar} />
          <View>
            <AppContext.Consumer>
              {({state}) => {
                const user = getUserById(state, blog.userID);

                if (!user) {
                  return null;
                }

                return (
                  <Text style={styles.blogOwnerName}>{user.userName}</Text>
                );
              }}
            </AppContext.Consumer>
            <Text style={styles.blogContent}>{blog.blogContent}</Text>
          </View>
        </View>
        <View style={styles.controlArea}>
          <Icon style={styles.controlButton} name={'comment'} />
          <Icon style={styles.controlButton} name={'retweet'} />
          <Icon style={styles.controlButton} name={'heart'} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginBottom: 3,
  },
  content: {
    height: 100,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  blogOwnerName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  blogContent: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  controlArea: {
    width: '100%',
    height: 50,
    paddingLeft: 100,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  controlButton: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
});
