import "./WaitingRoomScreen.css";

import StudentComponent from "./studentComponent";
import { getAccessCode, getClassName, getStudents } from "../services/VirtualClassService";
// import { environment } from "../environments/environment";

import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { environment } from "../environments/environment.tsx";

function WaitingRoomScreen() {

    const [gameCode, setGameCode] = useState('');
    const [className, setClassName] = useState('');
    const [studentList, setStudentList] = useState([]);
    const gameAddress = environment.gameAddress;

    useEffect(() => {
        getAccessCode().then((response) => {
            setGameCode(response.data);
        }).catch((err) => {
            console.log(err);
        });
        getClassName().then((response) => {
            setClassName(response.data);
        }).catch((err) => {
            console.log(err);
        });
        getStudents().then((response) => {
            setStudentList(response.data);
        });
    });

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