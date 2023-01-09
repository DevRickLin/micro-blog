import React, {SetStateAction, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button, Input, VStack, Heading} from 'native-base';
import {login} from '../api';
import {RootStackScreenProps} from '../types/navigator.type';
import {AppContext} from '../context/app';
import {IAPPState} from '../types/app.inferface';

export const LoginScreen = ({navigation}: RootStackScreenProps) => {
  const [form, setForm] = useState({} as {user?: string; pwd?: string});

  const getOnPressHandler =
    (
      state: IAPPState,
      setState: React.Dispatch<SetStateAction<IAPPState>> | null,
    ) =>
    async () => {
      if (state.isLogin) {
        navigation.navigate('Normal');
      }

      if (!form.user || !form.pwd) {
        return;
      }
      try {
        const {userID, userName} = await login(Number(form.user), form.pwd);
        if (setState !== null) {
          setState({
            ...state,
            isLogin: true,
            userID,
            userName,
          });
        }
        navigation.navigate('Normal');
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <VStack style={styles.container} space={4}>
      <Heading>Express Micro Blog</Heading>
      <Text>帐号</Text>
      <Input
        style={styles.input}
        onChangeText={text => setForm({...form, user: text})}
      />
      <Text>密码</Text>
      <Input
        secureTextEntry={true}
        style={styles.input}
        onChangeText={text => setForm({...form, pwd: text})}
      />
      <AppContext.Consumer>
        {({state, setState}) => (
          <Button onPress={getOnPressHandler(state, setState)}>登入</Button>
        )}
      </AppContext.Consumer>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 50,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  input: {
    backgroundColor: 'white',
  },
});
