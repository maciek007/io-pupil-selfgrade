import {useState} from "react";

export default function QuestionsCarousel({questions, name, nextPerson}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const items = [];
    let id = 0;

    const handleNext = ()=> {

        setCurrentIndex(currentIndex+1)
        if(currentIndex==items.length-1)
        {
            setCurrentIndex(0);
            nextPerson();
        }
    };
    const handlePrev = ()=>{setCurrentIndex(currentIndex-1)};


    if (questions.longQuestions)
        items.push(...questions.longQuestions.map((lq: string) =>
            (
                <div key={id++}>
                    <h3>{lq}</h3>
                    <input required type="text" minLength={5} maxLength={100}></input>
                </div>
            )
        ))

    if (questions.shortQuestions)
        items.push(...questions.shortQuestions.map((sq: string) =>
            (
                <div key={id++}>
                    <h3>{sq}</h3>
                    <input minLength={20} maxLength={500} required type="text"></input>
                </div>
            )
        ))

    if (questions.multiSelections)
        items.push(...questions.mutiSelections.map((ms: string[]) => (
            <div key={id++}>
                <h3>ms[0]</h3>
                {ms.slice(1).map((option: string, index) =>
                    (
                        <>
                            <input type="checkbox" name={id - 1 + "-multi"} value={index}/>
                            <label> {option} </label><br/>
                        </>
                    )
                )}
            </div>
        )))

    if (questions.singleSelections)
        items.push(...questions.singleSelections.map((ss: string[]) => (
            <div key={id++}>
                <h3>ss[0]</h3>
                {ss.slice(1).map((option: string, index) =>
                    (
                        <>
                            <input type="radio" name={id - 1 + "-single"} value={index} required/>
                            <label> {option} </label><br/>
                        </>
                    )
                )}
            </div>
        )))
    //console.log(items);
    return (
        <form>
            <h2>Question: {currentIndex+1} / {items.length}</h2>
            {items[currentIndex]}
            {/*<button onClick={handlePrev}>{currentIndex==0?"Poprzednia osoba":"Poprzednie"}</button>*/}
            <button type="submit" onClick={handleNext}>{currentIndex<items.length-1?"Następne":"Następna osoba"}</button>
        </form>
)
}