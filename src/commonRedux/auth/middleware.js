import AuthActions from './action';
import axios from 'axios';
import setAuthToken from '../../../utils/setAuthToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_ERRORS } from './type';

export default class AuthMiddleware {
    static doLogin(userData) {
        return (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                let URL = `https://api.littlebookcompany.net/v1/api/reader/login`;
                axios.post(URL, userData).then(function (response) {

                    if (response?.data?.content?.length > 0) {
                        const { token, user } = response.data.content[0];

                        if (user) {
                            user.token = token
                            //setAuthToken(token);
                            axios.defaults.headers.common['x-access-token'] = token;
                            AsyncStorage.setItem('jwtToken', token);

                            dispatch(AuthActions.loginSucess(user));

                            resolve(user);
                        }


                    }


                })
                    .catch(function (error) {
                        // console.log('error',error)
                        if (error?.response?.data?.validation) {
                            //console.log(error.response.data);
                            error = error.response.data
                        } else {
                            error = { "msg": "Something went wrong" }
                        }
                        dispatch({
                            type: GET_ERRORS,
                            payload: error
                        })
                        //console.log(error, 'error')
                        reject(error)
                    })

            })


        };
    }


    static checkRegister(userData) {
        return (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                let URL = `https://api.littlebookcompany.net/v1/api/send`;
                axios.post(URL, userData).then(function (response) {

                    console.log(response.data)
                    resolve(response.data);


                })
                    .catch(function (error) {
                        // console.log('error',error)
                        if (error?.response?.data?.validation) {
                            //console.log(error.response.data);
                            error = error.response.data
                        } else {
                            error = { "msg": "Something went wrong" }
                        }
                        dispatch({
                            type: GET_ERRORS,
                            payload: error
                        })
                        //console.log(error, 'error')
                        reject(error)
                    })

            })


        };
    }

    static doRegister(userData) {
        return (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                let URL = `https://api.littlebookcompany.net/v1/api/reader/register`;
                axios.post(URL, userData).then(function (response) {

                    if (response?.data?.content?.length > 0) {
                        const { token, user } = response.data.content[0];
                        console.log(response.data.content[0])

                        if (user) {

                            //setAuthToken(token);
                            axios.defaults.headers.common['x-access-token'] = token;
                            dispatch(AuthActions.loginSucess(user));

                            resolve(user);
                        }
                        //  else {
                        //   dispatch(AuthActions.loginFail('User didnt found'));
                        //   reject('Cant able to login  ');
                        // }

                    }


                })
                    .catch(function (error) {
                        // console.log('error',error)
                        if (error?.response?.data?.validation) {
                            //console.log(error.response.data);
                            error = error.response.data
                        } else {
                            error = { "msg": "Something went wrong" }
                        }
                        dispatch({
                            type: GET_ERRORS,
                            payload: error
                        })
                        //console.log(error, 'error')
                        reject(error)
                    })

            })


        };
    }



    static logout() {
        return (dispatch, getState) => {
            delete axios.defaults.headers.common['x-access-token']
            // AsyncStorage.removeItem('jwtToken', (err, result) => {
            //   console.log(result)
            // });
            dispatch(AuthActions.logout())
        }
    }

    static listByID(array, key) {
        return array.reduce((json, value) => {
            json[value[key]] = value;
            return json;
        }, {});
    }
}