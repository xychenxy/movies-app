const cache = require("memory-cache");

const getFrequentlyMovie = (film_id) => {
    let movies = cache.get("allMovies");
    if (movies) {
        // Fix unexpected token issue, work in dev
        // return (
        //     movies.find((item) => item?.films?.film_id === film_id) ||
        //     movies.find((item) => item?.id === film_id)
        // );
        return true;
    }
    return false;
};

const setFrequentlyMovie = (movie) => {
    let movies = cache.get("allMovies");
    if (movies) {
        movies.push(movie);
        cache.put("allMovies", movies, 1200000); // 20 minutes
    } else {
        movies = [];
        movies.push(movie);
        cache.put("allMovies", movies, 1200000); // 20 minutes
    }
};

module.exports = { getFrequentlyMovie, setFrequentlyMovie };
