import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://127.0.0.1:8000/api/v1'
});

const clienteCloudinary = axios.create({
    baseURL : 'https://api.cloudinary.com/v1_1/wstoreproject'
});

export {clienteAxios, clienteCloudinary};