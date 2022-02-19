import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'https://wstore-server.herokuapp.com/api/v1'
});

const clienteCloudinary = axios.create({
    baseURL : 'https://api.cloudinary.com/v1_1/wstoreproject'
});

export {clienteAxios, clienteCloudinary};