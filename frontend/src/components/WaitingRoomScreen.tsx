import "./WaitingRoomScreen.css";

import StudentComponent from "./studentComponent";

import QRCode from "react-qr-code";

function WaitingRoomScreen() {
    let gameCode = "1234";
    let gameAddress = "www.google.com";
    let className = "3A";
    let studentsList = ["Jan Kowalski", "Adam Nowak", "Anna Kowal", "Krzysztof Nowak", "Katarzyna Kowalska", "Piotr Nowak", "Jan Kowalski", "Adam Nowak", "Anna Kowal", "Krzysztof Nowak", "Katarzyna Kowalska"];

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