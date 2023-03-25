export const getLoggedInUser = (state) => {
    return state?.auth?.user
}

export const getAuthToken = (state) => {
    return state?.auth?.user?.token;
}

export const getIsAuthenticated = (state) => {
    return state?.auth?.user?.isAuthenticated;
}

export const getUsers = (state) => {
    return state?.auth?.users;
}

export const getAllcartItems = (state) => {
    return state?.cartReducer?.cart
}