import { createReducer, on } from '@ngrx/store';
import { deleteUserDetail, setUserDetail } from './auth.actions';
import { UserDetail } from 'src/app/models/userDetail';

export interface AuthState {
  userDetail?: UserDetail;
}

const initialAuthState: AuthState = {
  userDetail: undefined,
};

export const AuthReducer = createReducer(
  initialAuthState,
  on(setUserDetail, (state: AuthState, { userDetail }) => ({
    ...state,
    userDetail: userDetail,
  })),
  on(deleteUserDetail, (state: AuthState) => ({
    ...state,
    userDetail: undefined,
  }))
);
