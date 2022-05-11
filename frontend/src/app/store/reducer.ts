import { createReducer, on } from '@ngrx/store';
import { login, staff, getCart } from './actions';
import { Cart } from 'app/types';

export interface Status {
  isLogin: boolean;
  isStaff: boolean;
  cartList: Cart[];
}

export const initialState: Status = {
  isLogin: Boolean(localStorage.getItem('token')) || false,
  isStaff: Boolean(localStorage.getItem('isStaff')) || false,
  cartList: [],
};

export const Reducer = createReducer(
  initialState,
  on(login, (state, { isLogin }) => ({ ...state, isLogin: isLogin })),
  on(staff, (state, { isStaff }) => ({ ...state, isStaff: isStaff })),
  on(getCart, (state, { cartList }) => ({ ...state, cartList: cartList }))
);
