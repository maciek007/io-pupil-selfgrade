import { getToken } from "./StorageService.ts";
import axios from "axios";
import { environment } from "../environments/environment.tsx";


export const startGame = () => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };
    return axios.post(environment.backEnd + "/game/start", axiosConfig);
}
