import "./VirtualClassCreator.css";
import {useState} from "react";
import {createVirtualClass} from "../services/VirtualClassService.ts";
import {saveToken} from "../services/StorageService.ts";
import {useNavigate} from "react-router-dom";

function VirtualClassCreator() {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const handleCreateGame = () => {
        if (name.length == 0) {
            alert("Proszę podać nazwę klasy");
            return;
        }
        createVirtualClass(name).then((res) => {
            if (res.data.access != null) {
                saveToken(res.data.access);
                navigate("/class/form");
            }
        }).catch((err) => {
            if (err.response.status == 409) {
                alert("Wirtualna klasa już istnieje");
            } else {
                alert("Błąd przy tworzeniu klasy");
            }
        });
    }

    return (
        <div>
            <img src="../assets/logo.png" alt="Logo" className="logo" />
            <div className="controls">
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <button className="w-full" onClick={handleCreateGame}>Utwórz nową grę</button>
            </div>
        </div>
    );

}

export default VirtualClassCreator;