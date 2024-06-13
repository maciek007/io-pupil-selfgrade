import { getToken } from "./StorageService.ts";
import axios from "axios";
import { environment } from "../environments/environment.tsx";


export const createVirtualClass = (name: string) => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer ' + getToken()
        }
    }

    return axios.post(environment.backEnd + "/class", { name }, axiosConfig);
};

export const deleteVirtualClass = () => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer ' + getToken()
        }
    }
    return axios.delete(environment.backEnd + "/class", axiosConfig);
};

export const getAccessCode = () => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer ' + getToken()
        }
    }
    return axios.get(environment.backEnd + "/class/code", axiosConfig);
}

export const getStudents = () => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer ' + getToken()
        }
    }
    return axios.get(environment.backEnd + "/class/students", axiosConfig);
}

export const getClassName = () => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer ' + getToken()
        }
    }
    return axios.get(environment.backEnd + "/class/name", axiosConfig);
}