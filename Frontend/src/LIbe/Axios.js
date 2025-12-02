import axios from "axios";
// in Production, there's no localhost so we have to make this dynamic
const BaseURL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

const api = axios.create({
    baseURL: BaseURL,
})

export default api;