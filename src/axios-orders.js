import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-ed84d.firebaseio.com/'
});

export default instance;