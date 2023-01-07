import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';

import { StyleSheet, Text } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { findExpress } from '../api';
import { ScanStackScreenProps } from '../types/navigator.type';

export function ScannerScreen(props: ScanStackScreenProps<'Scanner'>) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const isFocused = useIsFocused();

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    console.log("qrcode detected:", barcodes[0]?.rawValue);
    const code = barcodes[0]?.rawValue;
    if (!code) {
      return;
    }

    findExpress(Number(code))
      .then(res =>
        props.navigation.navigate('Result', res))
      .catch(err => {
        console.log('findExpress 请求错误>>>', err);
        props.navigation.navigate('Result', {
          expressName: '笔记型电脑',
          expressAddress: '湖南省长沙市岳麓区',
          expressPhone: '15576628395',
          expressID: 0
        });
      })
  }, [barcodes])

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {barcodes.map((barcode, idx) => {
          return <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
          </Text>
        })}
      </>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});