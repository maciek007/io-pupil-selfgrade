import { getToken } from "./StorageService.ts";
import axios from "axios";
import { environment } from "../environments/environment.tsx";



export const isTeacher = () => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }

    return axios.get(environment.backEnd + "/class/isTeacher", axiosConfig);
}

export const isStudent = () => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    }
    return axios.get(environment.backEnd + "/class/isStudent", axiosConfig);
}
