import { getToken } from "./StorageService.tsx";
import axios from "axios";
import { environment } from "../environments/environment.tsx";

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
    }
}

export const createVirtualClass = (name: string) => {
    return axios.post(environment.backEnd + "/class", { name }, axiosConfig);
};

export const deleteVirtualClass = () => {
    return axios.delete(environment.backEnd + "/class", axiosConfig);
};

export const getAccessCode = () => {
    return axios.get(environment.backEnd + "/class/code", axiosConfig);
}

export const getStudents = () => {
    return axios.get(environment.backEnd + "/class/students", axiosConfig);
}

export const getClassName = () => {
    return axios.get(environment.backEnd + "/class/name", axiosConfig);
}