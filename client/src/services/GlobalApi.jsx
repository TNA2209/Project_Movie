import axios from 'axios'

const movieBareUrl = "https://api.themoviedb.org/3"
const api_key = "94e8fb7774f13ab0800def0f712c9875"
const movieByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=94e8fb7774f13ab0800def0f712c9875';
// https://api.themoviedb.org/3/trending/all/day?api_key=94e8fb7774f13ab0800def0f712c9875
const getTrendingVideos = axios.get(movieBareUrl + '/trending/all/day?api_key=' + api_key)

const getMovieByGenreId=(id)=>
    axios.get(movieByGenreBaseURL+"&with_genres="+id)

export default {
    getTrendingVideos,
    getMovieByGenreId
}
