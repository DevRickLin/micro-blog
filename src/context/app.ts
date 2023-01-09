import React, {SetStateAction} from 'react';
import {IAPPState} from '../types/app.inferface';

export const AppContext = React.createContext({
  state: {isLogin: false} as IAPPState,
  setState: null as React.Dispatch<SetStateAction<IAPPState>> | null,
});
