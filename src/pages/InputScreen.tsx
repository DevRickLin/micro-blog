import React from 'react';
import {useState} from 'react';
import {Text} from 'react-native';
import {TextArea, Button, HStack, VStack, Center} from 'native-base';
import {addBlog, addComment} from '../api';
import {AppContext} from '../context/app';
import {NormalStackScreenProps} from '../types/navigator.type';

export const InputScreen = (props: NormalStackScreenProps<'Input'>) => {
  const {mode, blogID} = props.route.params;

  const [text, setText] = useState('');

  const getOnPressHandler = (userID?: number) => () => {
    if (!userID) {
      return;
    }
    if (mode === 'blog') {
      addBlog(userID, text)
        .then(res => console.log(res))
        .then(() => props.navigation.goBack())
        .catch(err => console.log(err));
      return;
    }
    if (mode === 'comment' && blogID) {
      addComment(userID, blogID, text)
        .then(res => console.log(res))
        .then(() => props.navigation.goBack())
        .catch(err => console.log(err));
      return;
    }
  };

  return (
    <VStack height={'100%'} space={4}>
      <Center height={'80%'} backgroundColor={'white'}>
        <TextArea
          height={'100%'}
          backgroundColor={'white'}
          borderColor={'white'}
          focusOutlineColor={'white'}
          focusable={false}
          placeholder="写点东西..."
          onChangeText={setText}
          autoCompleteType={undefined}
        />
      </Center>
      <HStack direction={'row-reverse'}>
        <AppContext.Consumer>
          {({state}) => (
            <Button onPress={getOnPressHandler(state.userID)} marginRight={5}>
              <Text style={{color: 'white'}}>
                发送{mode === 'blog' ? '博客' : '评论'}
              </Text>
            </Button>
          )}
        </AppContext.Consumer>
      </HStack>
    </VStack>
  );
};
