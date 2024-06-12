import { getToken } from "./StorageService.ts";
import axios from "axios";
import { environment } from "../environments/environment.tsx";
import { FormCreationType } from "../components/FormCreation.tsx";

export const createForm = (form: FormCreationType) => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };

    const data = {
        longQuestionFields: form.longQuestions.questions,
        shortQuestionFields: form.shortQuestions.questions,
        multiSelectionFields: form.multipleSelectionQuestions.questions,
        singleSelectionFields: form.singleSelectionQuestions.questions,
        checkboxFields: form.checkboxQuestions.questions,
    };
    return axios.post(environment.backEnd + "/form", data, axiosConfig);
}
export const handleFormImport = () => {
    console.log("Importing form");
};

export const getForms = () => {
    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    };
    return axios.get(environment.backEnd + "/game/getForms", axiosConfig);
}

export const sendAnswer = (name: string, data) => {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    };
    return axios.post(environment.backEnd + "/answer/" + name, data, axiosConfig);
}