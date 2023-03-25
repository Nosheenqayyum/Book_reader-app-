import { createReduxAction as createAction } from '../../commonUtils';

export const LOGIN = createAction('LOGIN');
export const SAVEDATA = createAction('SAVEDATA');

export const FORGET_PASSWORD = createAction('FORGET_PASSWORD');
export const LOGOUT = createAction('LOGOUT');
export const GET_APP_STATE = createAction('GET_APP_STATE');