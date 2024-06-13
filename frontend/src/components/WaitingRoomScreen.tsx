import "./WaitingRoomScreen.css";

import StudentComponent from "./studentComponent";
import { getAccessCode, getClassName, getStudents } from "../services/VirtualClassService";
import { isTeacher, isStudent } from "../services/UserRoleService.ts";
import { ActionButton } from "./formComponents/ActionButton.tsx";

import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { environment } from "../environments/environment.tsx";
import { useNavigate } from "react-router-dom";
import { startGame } from "../services/GameService.ts";
import { getForms } from "../services/FormService.ts";

const MIN_NUMBER_OF_STUDENTS = 2;

function WaitingRoomScreen() {

    const [gameCode, setGameCode] = useState('');
    const [className, setClassName] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [isTeacherField, setIsTeacher] = useState(false);
    const [isStudentField, setIsStudent] = useState(false);

    const navigate = useNavigate();

    const handleStartGame = () => {
        startGame().then(() => {
            navigate("/class/displaying");
        }).catch(() => {
            alert(`Gra nie może zostać rozpoczęta ponieważ wymagane jest co najmniej ${MIN_NUMBER_OF_STUDENTS} uczestników`);
        });
    };
    const handleStudentGettingForms = () => {
        getForms().then((forms) => {
            console.log(forms);

            navigate("/class/answer", { state: { forms: forms.data } });
        }).catch(() => {
            alert(`Gra się jeszcze nie zaczęła`);
        });
    };


    const gameAddress = environment.gameAddress;

    useEffect(() => {
        const fetchData = async () => {
            const [gameCodeResponse, classNameResponse, studentListResponse, isTeacherResponse, isStudentResponse] = await Promise.all([
                getAccessCode(),
                getClassName(),
                getStudents(),
                isTeacher(),
                isStudent()
            ]);

            setGameCode(gameCodeResponse.data);
            setClassName(classNameResponse.data);
            setStudentList(studentListResponse.data);
            setIsTeacher(isTeacherResponse.data);
            setIsStudent(isStudentResponse.data);
        };

        fetchData();
    }, []);

    return (
        <div className="wrapper">
            <div className="header">
                <div className="qr-container">
                    <QRCode size={256} style={{ height: "22vh", maxWidth: "100%", width: "auto" }}
                        value={gameAddress + "?code=" + gameCode} />
                </div>
                <div className="game-address">
                    <p>Kod dostępu: <strong>{gameCode}</strong></p>
                </div>
                <div className="class-name">
                    <p>Klasa: {className}</p>
                </div>
                {
                    isTeacherField ? (
                        <ActionButton
                            type="button"
                            label="Rozpocznij grę"
                            variant="primary"
                            onClick={() =>
                                handleStartGame()
                            }
                        />
                    ) : null
                }

                {
                    isStudentField ? (
                        <ActionButton
                            type="button"
                            label="Dołącz do gry"
                            variant="primary"
                            onClick={() =>
                                handleStudentGettingForms()
                            }
                        />
                    ) : null
                }
            </div>
            <div className="virtualClass">
                {studentList.length == 0 ? (
                    <h2>Oczekiwanie na graczy...</h2>
                ) : (
                    <div className="students-container">
                        {studentList.map((student, index) => (
                            <StudentComponent key={index} studentName={student} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default WaitingRoomScreen;