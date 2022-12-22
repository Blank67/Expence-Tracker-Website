import axios from "axios";

const API = axios.create({
    baseURL: "https://react-expence-tracker-default-rtdb.firebaseio.com"
})

export default API;