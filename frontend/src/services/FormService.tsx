import {getToken} from "./StorageService.tsx";
import axios from "axios";
import {environment} from "../environments/environment.tsx";

const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
  }
};

export const createForm = (form: any) => {
    return axios.post(environment.backEnd + "/form", form, axiosConfig);
}