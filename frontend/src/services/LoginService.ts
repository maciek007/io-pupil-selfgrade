import axios from "axios";
import { environment } from "../environments/environment.tsx";
import { getToken } from "./StorageService.ts";


export const joinClass = (code: string, name: string) => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const data = {
        code,
        name
    };
    return axios.post(environment.backEnd + "/class/join", data, axiosConfig);
}

export const removeStudent = () => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + getToken()
    };
    return axios.delete(environment.backEnd = "/class/remove", { headers: headers })
};

