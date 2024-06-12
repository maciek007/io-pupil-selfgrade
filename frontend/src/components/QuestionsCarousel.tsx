import {useState} from "react";

export default function QuestionsCarousel({questions, name, nextPerson}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const items = [];
    let id = 0;

    const questionType: number[]= [];
    const questionsText: string[] = [];

    const studentName =  name.replace(' ',"%20");
    console.log(questions, studentName);

    function handleNext(e:Event){
        e.preventDefault();
        setCurrentIndex(currentIndex+1)
        const data = {"question": questionsText[currentIndex], "answers":[]}
        switch (questionType[currentIndex]){
            case 0:
                data.answers.push(e.target.answer.value)
                break;
            case 1:
                for(answer of e.target.getElementsByTagName("input"))
                    data.answers.push(answer.value)
                break;
            case 2:
                break;
            case 3:
                break;
        }
        console.log(data)
        if(currentIndex==items.length-1)
        {
            setCurrentIndex(0);
            nextPerson();
        }
    }
    const handlePrev = ()=>{setCurrentIndex(currentIndex-1)};


    if (questions.longQuestions) {
        items.push(...questions.longQuestions.map((lq: string) =>{
            questionType.push(0);
            questionsText.push(lq);
            return (
                <div key={id++}>
                    <h3>{lq}</h3>
                    <input name="answer" required type="text" minLength={20} maxLength={500}></input>
                </div>
            )}
        ))

    }

    if (questions.shortQuestions) {

        items.push(...questions.shortQuestions.map((sq: string) => {
            questionType.push(0);
            questionsText.push(sq)
            return (
                <div key={id++}>
                    <h3>{sq}</h3>
                    <input minLength={5} maxLength={30} required type="text"></input>
                </div>
            )
        }))
    }

    if (questions.mutiSelections) {
        items.push(...questions.mutiSelections.map((ms: string[]) => {
            questionType.push(1);
            questionsText.push();
            return (
                <div key={id++}>
                    <h3>{ms[0]}</h3>
                    {ms.slice(1).map((option: string, index) =>
                        (
                            <>
                                <input type="checkbox" name={id - 1 + "-multi"} value={option}/>
                                <label> {option} </label><br/>
                            </>
                        )
                    )}
                </div>
            )
        }))
    }

    if (questions.singleSelections) {
        items.push(...questions.singleSelections.map((ss: string[]) => {
            questionType.push(0);
            return (
            <div key={id++}>
                <h3>{ss[0]}</h3>
                {ss.slice(1).map((option: string, index) =>
                    (
                        <>
                            <input type="radio" name="answer" value={option} required/>
                            <label> {option} </label><br/>
                        </>
                    )
                )}
            </div>
            )}
        ))
    }

    if (questions.checkboxes) {
        items.push(...questions.checkboxes.map((ss: string) => {
            questionType.push(0);
            return (
                <div key={id++}>
                    <h3>{ss}</h3>
                    <div className="flex space-x-5">
                        <div><input type="radio" name="answer" value="Tak" required/> Tak</div>
                        <div><input type="radio" name="answer" value="Nie" required/> Nie</div>
                    </div>
                </div>
            )
        }))
    }
    //console.log(items);
    return (
        <form onSubmit={handleNext}>
            <h2>Question: {currentIndex+1} / {items.length}</h2>
            {items[currentIndex]}
            {/*<button onClick={handlePrev}>{currentIndex==0?"Poprzednia osoba":"Poprzednie"}</button>*/}
            <button type="submit"> {currentIndex<items.length-1?"Następne":"Następna osoba"}</button>
        </form>
)
}