import axios from 'axios';
import './App.css'
import { useEffect } from 'react'

function App() {
    const test = async () => {
      const res = await axios.post('http://localhost:8000/api/v1/auth/login/', {
        'email': 'abid@gmail.com',
        'password': 'ys2b7kat'
      });

      console.log(res);
    }




  

  return (
    <>

    <button onClick={test} >Send</button>
      
    </>
  )
}

export default App
