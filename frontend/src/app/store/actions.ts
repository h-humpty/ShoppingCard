import { createAction, props } from '@ngrx/store';

export const login = createAction(
  'store login status',
  props<{ isLogin: boolean }>()
);
export const staff = createAction(
  'admin or user',
  props<{ isStaff: boolean }>()
);
