import axios from 'axios';


export const fetchData = () => {
    console.log('fetch Data...');
    return axios.get('http://192.168.0.14:8000/data/printers')
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

