import "./LoginScreen.css"

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { joinClass } from "../services/LoginService.ts";
import { saveToken } from "../services/StorageService.ts";

function LoginScreen() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [code, setCode] = useState('');
    const [name, setName] = useState('');

    const handleJoinGame = () => {
        if (code.length != 5) {
            alert("Kod powienien mieć 5 cyfr");
            return;
        }
        if (name.length == 0) {
            alert("Proszę podać imię i nazwisko");
            return;
        }
        joinClass(code, name).then((res) => {
            if (res.data.access != null) {
                saveToken(res.data.access);
                navigate("/class");
            }
        }).catch((e) => {
            if (e.response.status == 409) {
                alert("Użytkownik z daną nazwą jest już w klasie");
            } else if (e.response.status == 404) {
                alert("Gra z podanym kodem nie istnieje");
            } else if (e.response.status == 423) {
                alert("Gra z podanym kodem jest już rozpoczęta");
            } else {
                alert("Błąd przy dołącza");
            }

        })
    }

    useEffect(() => {
        const code = searchParams.get("code")
        if (code != null) {
            setCode(code);
        }
    }, [searchParams]);


    return (
        <div id="container">
            <div>
                <label>
                    Kod:
                    <input value={code} type="text" onChange={e => setCode(e.target.value)} />
                </label>
                <label>
                    Imię i nazwisko:
                    <input value={name} type="text" onChange={e => setName(e.target.value)} />
                </label>
                <button className="w-full" onClick={handleJoinGame}>Dołącz do gry</button>
            </div>
        </div>
    );
}

export default LoginScreen;