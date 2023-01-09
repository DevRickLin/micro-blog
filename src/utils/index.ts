import {IAPPState} from '../types/app.inferface';
import {IUser} from '../types/user.interface';

export function getUserById(state: IAPPState, userID: IUser['userID']) {
  const {users} = state;
  for (const user of users) {
    if (user.userID === userID) {
      return user;
    }
  }
  return null;
}
