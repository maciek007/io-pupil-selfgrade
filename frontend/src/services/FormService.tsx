import {getToken} from "./StorageService.tsx";
import axios from "axios";
import {environment} from "../environments/environment.tsx";
import {FormCreationData} from "../components/FormCreation.tsx";

export const createForm = (form: FormCreationData) => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };
    const data = {
        longQuestionFields: form.longQuestions.questions,
        shortQuestionFields: form.shortQuestions.questions
    };
    return axios.post(environment.backEnd + "/form", data, axiosConfig);
}