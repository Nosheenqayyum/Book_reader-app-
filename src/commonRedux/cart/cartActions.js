
export const addToCart = (item) => (dispatch) => {
    return dispatch({
        type: 'ADD_BOOK_CART',
        payload: item
    })
}
export const removeItem = (item) => dispatch => {
    dispatch({
        type: 'REMOVE_BOOK_CART',
        payload: item
    })
}

export const emptyCart = () => dispatch => {
    console.log('Emptying Cart:')
    dispatch({
        type : 'EMPTY_BOOK_CART',
        payload : null
    })
}
