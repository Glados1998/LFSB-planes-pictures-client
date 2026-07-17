import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.STRAPI_API_URL,
    timeout: 15000,
});

export function isRequestCanceled(error) {
    return axios.isCancel(error) || error?.code === "ERR_CANCELED";
}
