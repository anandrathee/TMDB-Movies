import axios from 'axios';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN




const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Authorization': `Bearer ${TMDB_TOKEN}`,
        'Accept': 'application/json',
    }
})

export default instance;
