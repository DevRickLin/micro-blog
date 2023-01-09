import {IUser} from './user.interface';

export interface IAPPState {
  isLogin: boolean;
  userID?: number;
  userName?: string;
  users: IUser[];
}
