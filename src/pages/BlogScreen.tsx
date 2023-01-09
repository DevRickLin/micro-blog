import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Center,
  Text,
  ScrollView,
  VStack,
  HStack,
  Avatar,
  Heading,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {findComments} from '../api';
import {CommentCard} from '../components/CommentCard';
import {IComment} from '../types/blog.interface';
import {
  NormalStackParamList,
  NormalStackScreenProps,
} from '../types/navigator.type';
import {getUserById} from '../utils';
import {AppContext} from '../context/app';
import {MockAvatar} from '../components/Avatar';

export const BlogScreen = ({
  route,
  navigation,
}: NormalStackScreenProps<'Blog'>) => {
  const {blogContent, blogID, userID} =
    route.params as NormalStackParamList['Blog'];

  const [commentsList, setCommentsList] = useState([] as IComment[]);

  const isFocused = useIsFocused();

  useEffect(() => {
    findComments(blogID).then(comments => setCommentsList(comments));
  }, [blogID, isFocused]);

  return (
    <VStack space={3} height={'100%'}>
      <VStack backgroundColor={'white'}>
        <VStack padding={5}>
          <HStack alignItems={'center'} space={5}>
            <MockAvatar />
            <AppContext.Consumer>
              {({state}) => {
                const user = getUserById(state, userID);
                return <Heading>{user?.userName}</Heading>;
              }}
            </AppContext.Consumer>
          </HStack>
          <VStack>
            <Text marginLeft={73} fontSize={20}>
              {blogContent}
            </Text>
          </VStack>
        </VStack>
        <HStack direction={'row-reverse'} padding={5}>
          <Button
            onPress={() =>
              navigation.navigate('Input', {mode: 'comment', blogID})
            }>
            <Text style={{color: 'white'}}>发表评论</Text>
          </Button>
        </HStack>
      </VStack>
      <ScrollView>
        {commentsList.map(comment => (
          <CommentCard key={comment.commentID} comment={comment} />
        ))}
      </ScrollView>
    </VStack>
  );
};

const styles = StyleSheet.create({
  blogContainer: {
    minHeight: 200,
    height: '30%',
  },
  blogContent: {
    height: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  controlArea: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  commentButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
