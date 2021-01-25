const express = require("express");
const { connectDB } = require("./config/db");
const path = require("path");
const app = express();
const cors = require("cors");

// connectDB();

// Init Middleware to parse body data
app.use(
    express.json({
        extended: false,
        limit: "50MB",
    })
);

// Add Cors policy
app.use(cors());

// Send API running status
app.use("/api/status", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/moviesworld", require("./routes/api/moviesworld"));

// Serve static assets in production
if (process.env.NODE_ENV !== "development") {
    //Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
