import {Heading, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {AppContext} from '../context/app';
import {IComment} from '../types/blog.interface';
import {getUserById} from '../utils';
import {MockAvatar} from './Avatar';

export const CommentCard = ({comment}: {comment: IComment}) => {
  return (
    <HStack space={5} backgroundColor={'white'} padding={5} margin={1}>
      <MockAvatar />
      <VStack>
        <AppContext.Consumer>
          {({state}) => {
            const user = getUserById(state, comment.userID);
            return <Heading fontSize={20}>{user?.userName}</Heading>;
          }}
        </AppContext.Consumer>
        <Text fontSize={20}>{comment.commentContent}</Text>
      </VStack>
    </HStack>
  );
};
