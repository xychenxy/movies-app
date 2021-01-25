const mongoose = require("mongoose");

const FilmWorldSchema = new mongoose.Schema(
    {
        film_id: {
            type: Number,
            required: true,
        },
        film_name: {
            type: String,
            required: true,
        },
        synopsis_long: {
            type: String,
        },
        duration_mins: {
            type: Number,
        },
        images: {
            type: Object,
        },
        show_dates: {
            type: Object,
        },
        price: {
            type: Number,
        },
    },
    { collection: "filmWorld" }
);

module.exports = FilmWorld = mongoose.model("filmWorld", FilmWorldSchema);
