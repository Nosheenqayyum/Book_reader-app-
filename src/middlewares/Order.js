import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class OrdersMiddleware {
    static async createOrders() {
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        return new Promise(async (resolve, reject) => {


            // await this.mockRequest()
            let URL = `https://api.littlebookcompany.net/v1/api/library/book`;
            let token = '';
            AsyncStorage.getItem('jwtToken', (err, result) => {
                console.log(result);
                token = result


                axios.post(URL, { headers: { 'x-access-token': result } }).then(function (response) {
                    // console.log('response', response.data);
                    resolve(response.data);
                }).catch(function (error) {
                    console.log(error, 'error')
                    reject(error)
                })
            });
        })
    }

    static async createOrder(userData) {

        return new Promise(async (resolve, reject) => {


            //await this.mockRequest()
            let URL = `https://api.littlebookcompany.net/v1/api/order`;
            AsyncStorage.getItem('jwtToken', (err, result) => {
                console.log(result);
                token = result

                axios.post(URL, userData, { headers: { 'x-access-token': result } }).then(function (response) {
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
            });
        })

    }

    static async chargeStripe(data) {
        return new Promise(async (resolve, reject) => {
            let URL = `https://api.littlebookcompany.net/v1/api/stripe/charge`;

            axios.post(URL, data, {headers:{"Content-Type" : "application/json"}}).then(function (response) {
                console.log(response.data);
                resolve(response.data);
            })
                .catch(function (error) {
                    console.log('CHARGE STRIPE ERROR', error.message)
                    reject(error)
                })
        })
    }

    static async postOrder(data) {
        console.log('POst Order: ', data)
        return new Promise(async (resolve, reject) => {
            let URL = `https://api.littlebookcompany.net/v1/api/order`;

            axios.post(URL, data).then(function (response) {
                resolve(response.data);
            })
                .catch(function (error) {
                    reject(error)
                })
        })
    };

    static async orderConfirmationMailToUser(data) {
        console.log('Mailed Inner DAta', data);
        return new Promise(async (resolve, reject) => {
            let URL = `https://api.littlebookcompany.net/v1/api/ordermail`;
            axios.post(URL, data)
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    };

    static async orderConfirmationMailToAuthor(data) {

        return new Promise(async (resolve, reject) => {
            let URL = `https://api.littlebookcompany.net/v1/api/ordermailtoauthor`;

            axios.post(URL, data)
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    };

    static async orderUpdate(data) {
        return new Promise(async (resolve, reject) => {
            let URL = `https://api.littlebookcompany.net/v1/api/order`;
            
            
            axios.put(URL, data)
                .then(res => {
                    console.log(res)
                    resolve(res.data)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                });
        })
    };


    static async updateOrder(userData) {

        return new Promise(async (resolve, reject) => {


            //await this.mockRequest()
            let URL = `https://api.littlebookcompany.net/v1/api/order`;
            // AsyncStorage.getItem('jwtToken', (err, result) => {
            //     console.log(result);
            //     token = result

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
            // });
        })

    }

    static async putBookInLibrary(userData) {

        return new Promise(async (resolve, reject) => {


            //await this.mockRequest()
            let URL = `https://api.littlebookcompany.net/v1/api/library/book`;

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
                console.log(error, 'error')
                reject(error)
            })
        })

    }


    static async createEasyPay(userData) {

        return new Promise(async (resolve, reject) => {


            //await this.mockRequest()
            let URL = `https://easypay.easypaisa.com.pk/easypay-service/rest/v4/initiate-ma-transaction`;


            axios.post(URL, userData, { headers: { 'Credentials': 'TGl0dGxlQm9va0NvbXBhbnk6YjllYmY2NDFiMmRmYTY3YTFiOWNkNDFkMjFjMGI5NzQ=' } }).then(function (response) {
                console.log(response.data)
                resolve(response.data);

            }).catch(function (error) {
                // if (error?.response?.data?.validation) {
                //     console.log(error.response.data);
                //     error = error.response.data
                //   } else {
                //     error = { "msg": "Something went wrong" }
                //   }
                //   dispatch({
                //     type: GET_ERRORS,
                //     payload: error
                //   })
                console.log(error, 'error')
                reject(error)
            })
        })

    }

    static async getUserOrders() {

        return new Promise(async (resolve, reject) => {
            let URL = `https://api.littlebookcompany.net/v1/api/reader/order`;
            axios.get(URL).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                console.log(error, 'error')
                reject(error)
            })
        })
    }

}