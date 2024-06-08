import { getToken } from "./StorageService.tsx";
import axios from "axios";
import { environment } from "../environments/environment.tsx";

export const createForm = (form: any) => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };
    //TODO: add the rest of the fields
    const data = {
        longQuestionFields: form.longQuestions.questions,
        shortQuestionFields: form.shortQuestions.questions
    };
    return axios.post(environment.backEnd + "/form", data, axiosConfig);
}