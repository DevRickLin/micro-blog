import {Center, Text} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppContext} from '../context/app';
import {ScanStackScreenProps} from '../types/navigator.type';

export function ScanResultScreen(props: ScanStackScreenProps<'Result'>) {
  if (!props.route.params) {
    return (
      <View>
        <Text>QR Code 格式错误或网路问题</Text>
      </View>
    );
  }

  const {expressName, expressAddress, expressPhone, userID} =
    props.route.params;
  return (
    <AppContext.Consumer>
      {({state}) => {
        if (state.userID !== userID) {
          return (
            <Center height={'100%'}>
              <Text fontSize={30} color={'red.500'}>
                您无权查看包裹信息
              </Text>
            </Center>
          );
        }

        return (
          <View style={styles.container}>
            <Text style={styles.text}>{expressName}</Text>
            <Text style={styles.text}>{expressAddress}</Text>
            <Text style={styles.text}>{expressPhone}</Text>
          </View>
        );
      }}
    </AppContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
