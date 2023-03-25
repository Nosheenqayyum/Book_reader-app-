import axios from "axios";

export default class BooksMiddleware {
    static async getBooks(token) {
        var tokens = ''
        tokens = token
        console.log('Tokens : ', tokens)
        return new Promise(async (resolve, reject) => {
            let url = `https://api.littlebookcompany.net/v1/api/book`;
            axios.get(url, { headers: { 'x-access-token': tokens } })
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static async getMyBooks() {
        return new Promise(async (resolve, reject) => {
            let URL = `https://api.littlebookcompany.net/v1/api/library/book`;
            axios.get(URL).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                console.log(error, 'error')
                reject(error)
            })
        })
    }

    static async searchBooks(Name) {
        return new Promise(async (resolve, reject) => {
            let url = `https://api.littlebookcompany.net/v1/api/book/search?Name=` + Name;

            axios.get(url)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static async filterBooks(Data) {
        return new Promise(async (resolve, reject) => {
            let URL = `https://api.littlebookcompany.net/v1/api/search/book?Category_ID=` + Data?.Category_ID + `&P_Category_ID=` + Data?.P_Category_ID;
            axios.get(URL).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                console.log(error, 'error')
                reject(error)
            })
        })
    }

    static async getCountryFromIp() {
        return new Promise(async (resolve, reject) => {
            let URL = `https://extreme-ip-lookup.com/json/`;
            axios.get(URL).then(function (response) {
                //console.log(response.data)
                resolve(response.data);
            }).catch(function (error) {
                console.log(error, 'error')
                reject(error)
            })
        })
    }
}