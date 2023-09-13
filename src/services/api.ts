import axios from "axios";

const api = axios.create({
    baseURL: "http://10.160.52.233:3999",
    timeout: 5000,
});

export default api;