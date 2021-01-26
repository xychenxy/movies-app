import axios from "axios";

const setBaseUrl = () => {
    axios.defaults.baseURL =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5000/"
            : "http://18.218.250.122/";
};

export default setBaseUrl;
