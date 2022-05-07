import { createReducer, on } from '@ngrx/store';
import { login, staff } from './actions';

export interface Status {
  isLogin: boolean;
  isStaff: boolean;
}

export const initialState: Status = {
  isLogin: Boolean(localStorage.getItem('token')) || false,
  isStaff: Boolean(localStorage.getItem('isStaff')) || false,
};

export const Reducer = createReducer(
  initialState,
  on(login, (state, { isLogin }) => ({ ...state, isLogin: isLogin })),
  on(staff, (state, { isStaff }) => ({ ...state, isStaff: isStaff }))
);
