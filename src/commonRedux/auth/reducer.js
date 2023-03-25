import setAuthToken from "../../../utils/setAuthToken";
import {
    LOGIN,
    SAVEDATA,
    LOGOUT,
    FORGET_PASSWORD,
    GET_APP_STATE
} from './constant';

const INITIAL_STATE = {
    users: null,
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    testMode: false,
    usersBYID: {}
}

export default function reducer(state = INITIAL_STATE, action) {
    const { type, payload, token } = action;

    switch (type) {
        // LOGIN, REGISTRATION, and LOGOUT requested.
        case LOGIN.REQUEST:
        case LOGOUT.REQUEST:
        case FORGET_PASSWORD.REQUEST:
            return { ...state, isLoading: true, error: null };

        // LOGIN and REGISTRATION succeeded.
        case LOGIN.SUCCESS:
            // console.log(token)
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                token: token,
            };

        case SAVEDATA.SUCCESS:
            return {
                ...state,
                users: payload.list,
                usersBYID: payload.byID
            };

        case SAVEDATA.FAIL:
            return {
                ...state,
            };
        // LOGIN, REGISTRATION, and LOGOUT failed.
        case LOGIN.FAIL:
        case LOGOUT.FAIL:
        case FORGET_PASSWORD.FAIL:
            return { ...state, error: payload };

        // LOGIN, REGISTRATION, and LOGOUT completed.
        case LOGIN.COMPLETE:
        //  case LOGOUT.COMPLETE:
        case FORGET_PASSWORD.COMPLETE:
            return { ...state, isLoading: false };

        // LOGOUT succeeded.
        case LOGOUT.SUCCESS:
            return { ...state, isAuthenticated: false, user: null, token: null };

        case GET_APP_STATE.SUCCESS:
            return {
                ...state,
                testMode: payload,
            };

        default:
            return state;
    }
}