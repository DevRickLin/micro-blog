import React, {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-reanimated';
import {NativeBaseProvider} from 'native-base';
import {BlogListScreen} from './src/pages/BlogListScreen';
import {BlogScreen} from './src/pages/BlogScreen';
import {InputScreen} from './src/pages/InputScreen';
import {ScannerScreen} from './src/pages/ScannerScreen';
import {MyScreen} from './src/pages/MyScreen';
import {LoginScreen} from './src/pages/LoginScreen';
import {IAPPState} from './src/types/app.inferface';
import {AppContext} from './src/context/app';
import {ScanResultScreen} from './src/pages/ScanResultScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {findAllUser} from './src/api';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ScanStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="BlogList"
        options={{title: '主页'}}
        component={BlogListScreen}
      />
      <HomeStack.Screen
        name="Blog"
        options={{title: '查看微博'}}
        component={BlogScreen}
      />
      <HomeStack.Screen
        name="Input"
        options={{title: '编辑'}}
        component={InputScreen}
      />
    </HomeStack.Navigator>
  );
}

function ScanStackScreen() {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen
        name="Scanner"
        options={{title: '快递扫码'}}
        component={ScannerScreen}
      />
      <ScanStack.Screen
        name="Result"
        options={{title: '快递信息'}}
        component={ScanResultScreen}
      />
    </ScanStack.Navigator>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: () => <Icon name="rss" size={20} />,
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanStackScreen}
        options={{
          tabBarIcon: () => <Icon name="qrcode" size={20} />,
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          tabBarIcon: () => <Icon name="user" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

const App = (): ReactNode => {
  const [state, setState] = useState({
    isLogin: false,
    userID: 1404,
  } as IAPPState);

  useEffect(() => {
    findAllUser().then(users => {
      setState({
        ...state,
        users,
      });
    });
  }, []);

  return (
    <NativeBaseProvider>
      <AppContext.Provider
        value={{
          state,
          setState,
        }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Normal" component={TabScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </NativeBaseProvider>
  );
};

export default App;
