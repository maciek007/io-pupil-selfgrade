
import "./VirtualClassCreator.css";

const handleFormChange = () => {
    console.log("Changing form");
}

const handleCreateGame = () => {
    console.log("Creating game");
}

const VirtualClassCreator = () => {
    return (
        <div>
            <img src="../assets/logo.png" alt="Logo" className="logo" />
            <div className="controls">
                <input type="text" placeholder="Klasa" className="class-name-input" />
                <button className="w-full" onClick={handleFormChange}>Wybierz formularz</button>
                <button className="w-full" onClick={handleCreateGame}>Utwórz nową grę</button>
            </div>
        </div>
    );
}

export default VirtualClassCreator;