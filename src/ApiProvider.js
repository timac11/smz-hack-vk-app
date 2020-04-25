import {API_URL} from "./API_CONFIG";

const axios = require('axios').default;

export function get(url) {
    return axios.get(API_URL + url);
}

export function post(url, data) {
    return axios.post(API_URL + url, data, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}