const customConfig = require("../config/headerConfig");
const axios = require("axios");
const config = require("config");

const getAllDisplayNow = async () => {
    let map = new Map();
    let requestAll = [];
    try {
        let requestOne = axios.get(
            `https://api-gate2.movieglu.com/filmsNowShowing/`,
            customConfig.cinemaApiConfig
        );
        requestAll.push(requestOne);
        let requestTwo = axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${config.filmApi.apiKey}&region=AU`
        );
        requestAll.push(requestTwo);
    } catch (error) {
        console.log(error);
    }

    await axios
        .all(requestAll)
        .then(
            axios.spread((...responses) => {
                const responseOne = responses[0];
                const responseTwo = responses[1];

                responseTwo.data.results.forEach((result) => {
                    let customRes = {
                        id: result.id,
                        source: "filmworld",
                        title: result.original_title,
                    };
                    if (map.get(result.original_title)) {
                        const temp = map.get(result.original_title);
                        //compare price, as these api don't have price
                        // if (temp.price < result.price) {
                        //     map.set(result.original_title, customRes);
                        // }
                    } else {
                        map.set(result.original_title, customRes);
                    }
                });
                responseOne.data.films.forEach((result) => {
                    let customRes = {
                        id: result.film_id,
                        source: "cinemaworld",
                        title: result.film_name,
                    };
                    if (map.get(result.film_name)) {
                        const temp = map.get(result.film_name);
                        //compare price, as these api don't have price
                        // if (temp.price < result.price) {
                        //     map.set(result.film_name, customRes);
                        // }
                    } else {
                        map.set(result.film_name, customRes);
                    }
                });
                // console.log("map", map);
            })
        )
        .catch((errors) => {
            console.log(errors);
        });

    return map;
};

const getCinemaWorldDisplayNow = async () => {
    const response = await axios.get(
        `https://api-gate2.movieglu.com/filmsNowShowing/`,
        customConfig.cinemaApiConfig
    );
    let map = new Map();
    response.data.films.forEach((result) => {
        let customRes = {
            id: result.film_id,
            source: "cinemaworld",
            title: result.film_name,
        };
        if (map.get(result.film_name)) {
            const temp = map.get(result.film_name);
            //compare price, as these api don't have price
            // if (temp.price < result.price) {
            //     map.set(result.film_name, customRes);
            // }
        } else {
            map.set(result.film_name, customRes);
        }
    });
    return map;
};

const getFilmWorldDisplayNow = async () => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${config.filmApi.apiKey}&region=AU`
    );
    let map = new Map();
    response.data.results.forEach((result) => {
        let customRes = {
            id: result.id,
            source: "filmworld",
            title: result.original_title,
        };
        if (map.get(result.original_title)) {
            const temp = map.get(result.original_title);
            //compare price, as these api don't have price
            // if (temp.price < result.price) {
            //     map.set(result.original_title, customRes);
            // }
        } else {
            map.set(result.original_title, customRes);
        }
    });
    return map;
};

module.exports = {
    getAllDisplayNow,
    getCinemaWorldDisplayNow,
    getFilmWorldDisplayNow,
};
