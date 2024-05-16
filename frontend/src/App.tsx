import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

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
