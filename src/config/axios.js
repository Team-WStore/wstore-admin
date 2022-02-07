import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://localhost:4001'
});

export default clienteAxios;