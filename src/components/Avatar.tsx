import React from 'react';
import {Avatar} from 'native-base';
import {ViewProps} from 'react-native';

export const MockAvatar = (props: ViewProps) => {
  return (
    <Avatar
      {...props}
      source={{
        uri: `https://picsum.photos/100?${
          new Date() + `${Math.random() * 100}`
        }`,
        cache: 'reload',
      }}
    />
  );
};
