import "./WaitingRoomScreen.css";

import StudentComponent from "./studentComponent";
import { getAccessCode, getStudents } from "../services/VirtualClassService";
import { environment } from "../environments/environment";

import QRCode from "react-qr-code";

function WaitingRoomScreen() {
    let gameCode = "Trwa ładowanie..."
    getAccessCode().then((response) => {
        gameCode = response.data;
    }).catch((err) => {
        console.log(err);
    });
    let gameAddress = "http://localhost:3000/join";
    let className = "...";
    getAccessCode().then((response) => {
        className = response.data;
    }).catch((err) => {
        console.log(err);
    });
    let studentsList: string[] = [];
    getStudents().then((response) => {
        studentsList = response.data;
    });

    return(
        <div className="wrapper">
            <div className="header">
                <div className="qr-container">
                    <QRCode size={256} style={{ height: "22vh", maxWidth: "100%", width: "auto" }}
            value={gameAddress}/>
                </div>
                <div className="game-address">
                    <p>Kod dostępu: <strong>{gameCode}</strong></p>
                </div>
                <div className="class-name">
                    <p>Klasa: {className}</p>
                </div>
            </div>
            <div className="virtualClass">
                {studentsList.length == 0 ? (
                    <h2>Oczekiwanie na graczy...</h2>
                ) : (
                    <div className="students-container">
                        {studentsList.map((student) => (
                            <StudentComponent studentName={student}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default WaitingRoomScreen;