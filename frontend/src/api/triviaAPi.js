import axios from 'axios';

const triviaApi = axios.create({
  baseURL: 'https://opentdb.com/', 
});

export default triviaApi;
