import axios from '../utils/axios';

export const fetchEvent  = () => axios.get('/events');