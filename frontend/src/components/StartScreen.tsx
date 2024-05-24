import "./StartScreen.css"

import {useNavigate} from "react-router-dom";

function StartScreen() {
    const navigate = useNavigate();

    const handleJoinGame = () => {
        navigate('/join');
    }

    const handleCreateGame = () => {
        navigate('/create');
    }

    return (
        <div id="container">
            <img src="../assets/logo.png" alt="Logo" className="logo"/>
            <div>
                <button onClick={handleCreateGame}>Utwórz nową grę</button>
                <button onClick={handleJoinGame}>Dołącz do gry</button>
            </div>
        </div>
    );
}

export default StartScreen;