import { useState } from "react";
import { sendAnswer } from "../services/FormService.ts";

export default function QuestionsCarousel({ questions, name, nextPerson }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const items = [];
    let id = 0;

    const questionType: number[] = [];
    const questionsText: string[] = [];

    const studentName = name.replace(' ', "%20");
    //console.log(questions, studentName);

    function handleNext(e: Event) {
        e.preventDefault();
        setCurrentIndex(currentIndex + 1)
        const data = { "question": questionsText[currentIndex], "answers": [] }
        switch (questionType[currentIndex]) {
            case 0:
                data.answers.push(e.target.answer.value)
                break;
            case 1:
                for (let answer of e.target.getElementsByTagName("input")) {
                    if (answer.checked)
                        data.answers.push(answer.value)
                }
                break;
            case 2:
        }
        sendAnswer(studentName, data);

        if (currentIndex == items.length - 1) {
            setCurrentIndex(0);
            nextPerson();
        }
    }
    const handlePrev = () => { setCurrentIndex(currentIndex - 1) };


    if (questions.longQuestions) {
        items.push(...questions.longQuestions.map((lq: string) => {
            questionType.push(0);
            questionsText.push(lq);
            return (
                <div key={id++}>
                    <h3>{lq}</h3>
                    <input name="answer" required type="text" minLength={20} maxLength={500}></input>
                </div>
            )
        }
        ))

    }

    if (questions.shortQuestions) {

        items.push(...questions.shortQuestions.map((sq: string) => {
            questionType.push(0);
            questionsText.push(sq)
            return (
                <div key={id++}>
                    <h3>{sq}</h3>
                    <input minLength={5} maxLength={30} required type="text" name="answer"></input>
                </div>
            )
        }))
    }

    if (questions.multiSelections) {
        items.push(...questions.multiSelections.map((ms: any) => {
            questionType.push(1);
            questionsText.push(ms.question);
            return (
                <div key={id++}>
                    <h3>{ms.question}</h3>
                    {ms.options.map((option: string, index) =>
                    (
                        <div key={index} className="flex flex-radio">
                            <input type="checkbox" name={(id - 1) + "-multi"} value={option} />
                            <label> {option} </label><br />
                        </div>
                    )
                    )}
                </div>
            )
        }))
    }

    if (questions.singleSelections) {
        items.push(...questions.singleSelections.map((ss: any) => {
            questionType.push(0);
            questionsText.push(ss.question)
            return (
                <div key={id++}>
                    <h3>{ss.question}</h3>
                    {ss.options.map((option: string, index) =>
                    (
                        <div key={index} className="flex flex-radio">
                            <input type="radio" name="answer" value={option} required />
                            <label> {option} </label><br />
                        </div>
                    )
                    )}
                </div>
            )
        }
        ))
    }

    if (questions.checkboxes) {
        items.push(...questions.checkboxes.map((ss: string) => {
            questionType.push(0);
            questionsText.push(ss)
            return (
                <div key={id++}>
                    <h3>{ss}</h3>
                    <div className="flex space-x-5">
                        <div><input type="radio" name="answer" value="Tak" required /> Tak</div>
                        <div><input type="radio" name="answer" value="Nie" required /> Nie</div>
                    </div>
                </div>
            )
        }))
    }
    //console.log(items);
    return (
        <form onSubmit={handleNext}>
            <h2>Question: {currentIndex + 1} / {items.length}</h2>
            {items[currentIndex]}
            {/*<button onClick={handlePrev}>{currentIndex==0?"Poprzednia osoba":"Poprzednie"}</button>*/}
            <button type="submit"> {currentIndex < items.length - 1 ? "Następne" : "Następna osoba"}</button>
        </form>
    )
}