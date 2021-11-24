import axios from 'axios';
import { ipConfig } from '../utils/ipVariable';

export const api = axios.create({
	baseURL: `http://${ipConfig}`,
});

export const apiBuscaCEP = axios.create({
	baseURL: 'https://viacep.com.br/ws',
});
