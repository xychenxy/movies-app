const mongoose = require("mongoose");

const CinemaWorldSchema = new mongoose.Schema(
    {
        film_id: {
            type: Number,
            required: true,
        },
        imdb_id: {
            type: Number,
        },
        film_name: {
            type: String,
        },
        synopsis_long: {
            type: String,
        },
        // duration_mins: {
        //     type: Number,
        // },
        images: {
            type: Object,
        },
        price: {
            type: Number,
        },
    },
    { collection: "cinemaWorld" }
);

module.exports = CinemaWorld = mongoose.model("cinemaWorld", CinemaWorldSchema);
