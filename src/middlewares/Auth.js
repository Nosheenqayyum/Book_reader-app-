import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from './type';

import setAuthToken from "../../utils/setAuthToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthMiddleware {
    static async doLogin(userData) {

        return new Promise(async (resolve, reject) => {


            //await this.mockRequest()
            let URL = `https://api.littlebookcompany.net/v1/api/reader/login`;
            axios.post(URL, userData).then(function (response) {

                if (response?.data?.content?.length > 0) {
                    const { token, user } = response.data.content[0];

                    // Set token to ls
                    AsyncStorage.setItem('jwtToken', token);
                    AsyncStorage.setItem('user', JSON.stringify(user), () => {
                        AsyncStorage.getItem('user', (err, result) => {
                            //console.log(result);
                        });
                    });
                    setAuthToken(token);
                }
                resolve(response.data);

            }).catch(function (error) {
                // console.log(error, 'error')
                if (error?.response?.data?.validation) {
                    // console.log(error.response.data);
                    error = error.response.data
                } else {
                    error = { "msg": "Something went wrong" }
                }

                // console.log(error, 'error')
                reject(error)
            })

        })

    }

    static async doRegister(userData) {

        return new Promise(async (resolve, reject) => {


            //await this.mockRequest()
            let URL = `https://api.littlebookcompany.net/v1/api/reader/register`;
            axios.post(URL, userData).then(function (response) {

                if (response?.data?.content?.length > 0) {
                    const { token, user } = response.data.content[0];

                    // Set token to ls
                    AsyncStorage.setItem('jwtToken', token);
                    AsyncStorage.setItem('user', JSON.stringify(user), () => {
                        AsyncStorage.getItem('user', (err, result) => {
                            //console.log(result);
                        });
                    });

                    // Set token to Auth header
                    setAuthToken(token);

                    // Decode token to get user data
                    //const decoded = jwt_decode(token);

                    // Set current user
                    // dispatch( setCurrentUser(user));
                }
                //console.log('response', response.data);
                resolve(response.data);

            }).catch(function (error) {
                //console.log(error, 'error')
                if (error?.response?.data?.validation) {
                    //  console.log(error.response.data);
                    error = error.response.data
                } else {
                    error = { "msg": "Something went wrong" }
                }
                //   dispatch({
                //     type: GET_ERRORS,
                //     payload: error
                //   })
                //   console.log(error, 'error')
                reject(error)
            })

        })

    }

    static async sendOtp(userData) {

        return new Promise(async (resolve, reject) => {


            //await this.mockRequest()
            let URL = `https://api.littlebookcompany.net/v1/api/sendmail`;
            axios.post(URL, userData).then(function (response) {
                console.log(response.data)
                resolve(response.data);

            }).catch(function (error) {
                //  console.log(error, 'error')
                if (error?.response?.data?.validation) {
                    //   console.log(error.response.data);
                    error = error.response.data
                } else {
                    error = { "msg": "Something went wrong" }
                }

                // console.log(error, 'error')
                reject(error)
            })

        })

    }

    static async sendOtpMbl(userData) {

        return new Promise(async (resolve, reject) => {


            //await this.mockRequest()
            let URL = `https://api.littlebookcompany.net/v1/api/send`;
            axios.post(URL, userData).then(function (response) {
                console.log(response.data)
                resolve(response.data);

            }).catch(function (error) {
                //  console.log(error, 'error')
                if (error?.response?.data?.validation) {
                    //   console.log(error.response.data);
                    error = error.response.data
                } else {
                    error = { "msg": "Something went wrong" }
                }

                // console.log(error, 'error')
                reject(error)
            })

        })

    }

    static async updatePassword(userData) {

        return new Promise(async (resolve, reject) => {


            //await this.mockRequest()
            let URL = `https://api.littlebookcompany.net/v1/api/reader`;
            axios.put(URL, userData).then(function (response) {
                console.log(response.data)
                resolve(response.data);

            }).catch(function (error) {
                console.log(error, 'error')
                if (error?.response?.data?.validation) {
                    console.log(error.response.data);
                    error = error.response.data
                } else {
                    error = { "msg": "Something went wrong" }
                }
                //   dispatch({
                //     type: GET_ERRORS,
                //     payload: error
                //   })
                console.log(error, 'error')
                reject(error)
            })

        })

    }

    static async setCurrentUser(decoded) {

        console.log(decoded)
        return {
            type: SET_CURRENT_USER,
            payload: decoded
        }
    }
}