import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';
import {TabScreenProps} from '../types/navigator.type';
import {AppContext} from '../context/app';
import {MockAvatar} from '../components/Avatar';

export const MyScreen = (props: TabScreenProps) => (
  <View style={styles.container}>
    <MockAvatar style={styles.avatar} />
    <AppContext.Consumer>
      {({state, setState}) => (
        <>
          <Text style={styles.userName}>{state.userName}</Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                if (!setState) {
                  return;
                }
                setState({
                  ...state,
                  isLogin: false,
                });
                props.navigation.navigate('Login');
              }}>
              登出
            </Button>
          </View>
        </>
      )}
    </AppContext.Consumer>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 200,
    height: 200,
  },
  userName: {
    fontSize: 70,
  },
  buttonContainer: {
    padding: 20,
  },
});
