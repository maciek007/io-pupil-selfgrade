import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);
    const fetchData = () => {
        axios.get("http://127.0.0.1:8080/helloWorld").then(res => {
            console.log(res);
            setData(res.data);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div>
                <h1>{data}</h1>
            </div>
        </>
    )
}

export default App
