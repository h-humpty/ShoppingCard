import { createAction, props } from '@ngrx/store';
import { Cart } from 'app/types';

export const login = createAction(
  'store login status',
  props<{ isLogin: boolean }>()
);
export const staff = createAction(
  'admin or user',
  props<{ isStaff: boolean }>()
);

export const getCart = createAction('get cart', props<{ cartList: Cart[] }>());
