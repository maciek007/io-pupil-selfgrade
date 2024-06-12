import "./AnswerScreen.css"

import { useNavigate, useSearchParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { joinClass } from "../services/LoginService.tsx";
import { saveToken } from "../services/StorageService.tsx";
import Carousel from 'react-bootstrap/Carousel';
import {getForms} from "../services/FormService.tsx";
import QuestionsCarousel from "./QuestionsCarousel.tsx";


export default function AnswerScreen() {
    const navigate = useNavigate();
    const [fillableForms, setFillableForms] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0)
    //const [searchParams] = useSearchParams();

    useEffect(() => {
        getForms().then((res)=>{setFillableForms(res.data);
            console.log(res.data)}); }, []);
    const handleNextPerson = () => {
        setCurrentIndex(currentIndex+1);
    }
    const handlePrevPerson = () => {
        setCurrentIndex(currentIndex-1);
    }


    if(fillableForms) {
        console.log(fillableForms, fillableForms.length);
        fillableForms.map((form, index) => console.log(index+"/"+fillableForms.length));
        return (
            <>
                {Array.from(fillableForms).map((form, index) => (
                        <>
                            <div>
                                <h1>{form.studentName} <span>{index + 1} / {fillableForms.length}</span></h1>
                            </div>
                            <QuestionsCarousel questions={form.form} name={form.studentName} nextPerson={handleNextPerson}/>
                        </>
                    ))[currentIndex]}
            </>
        );
    }
}