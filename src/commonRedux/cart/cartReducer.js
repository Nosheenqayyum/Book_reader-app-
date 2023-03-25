import {
    Alert,
    ToastAndroid
} from 'react-native';

const initialState = {
    cart: [],
    total: 0
}

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_BOOK_CART':
            console.log('ACTION PAYLOAD : ', action.payload)
            if (state.cart.length == 0) {
                ToastAndroid.showWithGravityAndOffset('Item Added to Cart', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 300)
                state.cart.push(action.payload)

            }
            else {
                let check = false;
                state.cart.map((obj) => {
                    if (obj.Book_ID == action.payload.Book_ID) {
                        ToastAndroid.showWithGravityAndOffset('Item Already In Cart', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 300)
                        check = true;
                        return
                    }
                })

                if (!check) {
                    ToastAndroid.showWithGravityAndOffset('Item Added to Cart', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 300)
                    state.cart.push(action.payload)
                }
            }
            return {
                ...state,
                cart: state.cart,
                total: 0
            }
        case 'REMOVE_BOOK_CART':
            return {
                ...state,
                cart: state.cart.filter((item, i) => item.Book_ID !== action.payload.Book_ID),
                total: 0
            }

        case 'EMPTY_BOOK_CART':
            console.log('Emptying Cart REDUCER:')
            return {
                ...state,
                cart: [],
                total: 0
            }

        default:
            return state
    }
}
