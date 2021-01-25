const express = require("express");
const router = express.Router();
const axios = require("axios");
const path = require("path");
const cinemaJsonFile = "../../assets/cinemaDB.json";
const { check, validationResult } = require("express-validator");
const apicache = require("apicache");
let cache = apicache.middleware;
const config = require("config");
const {
    getFrequentlyMovie,
    setFrequentlyMovie,
} = require("../../utils/getFrequentlyMovie");
const jsonfile = require("jsonfile");
const {
    getAllDisplayNow,
    getCinemaWorldDisplayNow,
    getFilmWorldDisplayNow,
} = require("../../utils/getDisplayNowMovie");

//  @router     GET api/moviesworld
//  @desc       This returns the movies that are available
//  @access     Public
router.get("/?:type/movies", cache("2 minutes"), async (req, res) => {
    try {
        const type = req.params.type;
        let result = new Map();

        switch (type) {
            case "all":
                await getAllDisplayNow().then((r) => {
                    result = r;
                });
                break;
            case "cinemaworld":
                await getCinemaWorldDisplayNow().then((r) => {
                    result = r;
                });
                break;
            case "filmworld":
                await getFilmWorldDisplayNow().then((r) => {
                    result = r;
                });
                break;
            default:
                break;
        }

        jsonfile.writeFile(
            path.resolve(__dirname, cinemaJsonFile),
            JSON.stringify([...result]),
            function (err) {
                if (err) console.error(err);
            }
        );

        return res.status(200).send({ data: [...result], msg: "Success!" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ data: null, msg: err.message });
    }
});

//  @router     GET api/cinemaworld
//  @desc       This returns the details of a single movie
//  @access     Public
router.get("/movie/:ID", async (req, res) => {
    try {
        const film_id = req.params.ID;
        let result = getFrequentlyMovie(film_id);
        console.log(result);
        if (!result) {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${film_id}?api_key=${config.filmApi.apiKey}&region=AU`
            );
            setFrequentlyMovie(response.data);
            result = response.data;
        }

        return res.status(200).send({ data: result, msg: "Success!" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ data: null, msg: err.message });
    }
});

//  @router     POST api/cinemaworld
//  @desc       Post a movie to the endpoint
//  @access     Public
router.post(
    "/",
    [
        check("film_name", "Please enter film name").exists(),
        check("imdb_id", "Please enter imdb id").exists(),
    ],
    async (req, res) => {
        // Check if any validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const film_id = Math.floor(10000 + Math.random() * 90000);
        const { imdb_id, film_name } = req.body;
        try {
            jsonfile
                .readFile(path.resolve(__dirname, cinemaJsonFile))
                .then((obj) => {
                    let temp = JSON.parse(obj);
                    if (temp.films.find((film) => film.film_id === film_id)) {
                        return res.status(400).send({
                            data: null,
                            msg: "This movie has already exsit.",
                        });
                    } else {
                        temp.films.push({
                            film_id,
                            imdb_id,
                            film_name,
                        });
                        jsonfile.writeFile(
                            path.resolve(__dirname, cinemaJsonFile),
                            JSON.stringify(temp),
                            function (err) {
                                if (err) console.error(err);
                            }
                        );
                    }
                })
                .catch((error) => console.error(error));

            return res.send({ data: null, msg: "Add movie successful." });
        } catch (err) {
            console.error(err.message);
            return res
                .status(500)
                .send(
                    "Server Error: Order could not created (Check order route)!"
                );
        }
    }
);

module.exports = router;
