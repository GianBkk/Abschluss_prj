import axios from 'axios';


export const fetchData = () => {
    console.log('fetch Data...');
    return axios.get('https://61f58cf962f1e300173c41c9.mockapi.io/api/v1/todos/todos')
        .then(res => res.data)
        .catch(err => console.log(err))
}

const wrapPromise = (promise) => {
    let status = 'pending';
    let result = '';
    let suspender = promise.then(r => {
        status = 'succes'
        result = r;
    }, e => {
        status = 'error'
        result = e
    })

    return {
        read() {
            if ( status === 'pending') {
                throw suspender
            } else if ( status === 'error') {
                throw result
            }

            return result
        }
    }
}

export const createResource = () => {
    return {
        info: wrapPromise(fetchData())
    }
}