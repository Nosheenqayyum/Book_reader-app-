import { combineReducers } from 'redux';
import auth from '../commonRedux/auth/reducer';
import cartReducer from '../commonRedux/cart/cartReducer';

export default combineReducers({ auth, cartReducer })