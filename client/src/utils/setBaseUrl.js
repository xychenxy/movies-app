import axios from "axios";

const setBaseUrl = () => {
    axios.defaults.baseURL =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5000/"
            : "http://3.129.6.80/";
};

export default setBaseUrl;
