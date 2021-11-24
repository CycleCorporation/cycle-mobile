import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://192.168.158.250:3333',
});

export const apiBuscaCEP = axios.create({
	baseURL: 'https://viacep.com.br/ws',
});
