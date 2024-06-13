import "./AnswerScreen.css"

import { useState } from "react";
import QuestionsCarousel from "./QuestionsCarousel.tsx";
import { useLocation } from "react-router-dom";


export default function AnswerScreen() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { state } = useLocation();
    const { forms: fillableForms } = state

    const handleNextPerson = () => {
        setCurrentIndex(currentIndex + 1);
    }
    const handlePrevPerson = () => {
        setCurrentIndex(currentIndex - 1);
    }


    if (fillableForms) {
        return (
            <>
                {Array.from(fillableForms).map((form, index) => (
                    <>
                        <div>
                            <h1>{form.studentName} <span>{index + 1} / {fillableForms.length}</span></h1>
                        </div>
                        <QuestionsCarousel questions={form.form} name={form.studentName} nextPerson={handleNextPerson} />
                    </>
                ))[currentIndex]}
            </>
        );
    }
}