import axios from "axios";

const setBaseUrl = () => {
    axios.defaults.baseURL =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5000/"
            : "http://localhost:5000/";
};

export default setBaseUrl;
