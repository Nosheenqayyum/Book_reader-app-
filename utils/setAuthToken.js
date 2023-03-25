import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        // Apply to every request
        console.log(token)
        console.log('haseeb get')
        //console.log(axios.defaults.headers.common['x-access-token'])
        axios.defaults.headers.common['x-access-token'] = token;
    } else {
        // Delete token header
        delete axios.defaults.headers.common['x-access-token']
    }
}

export default setAuthToken;