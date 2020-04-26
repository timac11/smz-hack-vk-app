import {API_URL} from "./API_CONFIG";

const axios = require('axios').default;

export function get(url) {
    return axios.get(API_URL + url, {headers: {
            "Access-Control-Allow-Origin": "*"
        }});
}

export function post(url, data) {
    return axios.post(API_URL + url, data, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}

export function getPaymentLink(price = 100) {
    return axios.post(API_URL + "create-payment-link", {
        price,
        pageParams: {
            "description": "Платёж за работу",
            "urlOnDecline": "http://localhost:65456/callback",
            "urlOnSuccess":  "http://localhost:65456/callback"
        }
    }, {headers: {
            "Access-Control-Allow-Origin": "*"
        }})
}
