
import './App.css';
import Home from './Home';
import About from './About';
import Navbar from './Navbar';
import {Routes,Route} from 'react-router-dom';
import SignIn from './components/SignIn';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AuthContext from './context/AuthContext'
import {useState} from 'react'

function App() {

  const firebaseConfig = {
      apiKey: "AIzaSyBejY-aL680nkVGQf55mtoLTzNg-sSRRj4",
      authDomain: "chatapp-22c4e.firebaseapp.com",
      databaseURL: "https://chatapp-22c4e-default-rtdb.firebaseio.com",
      projectId: "chatapp-22c4e",
      storageBucket: "chatapp-22c4e.appspot.com",
      messagingSenderId: "268422137513",
      appId: "1:268422137513:web:a32906c3071c6a4c888bb8",
      measurementId: "G-GYPW8FZ2MD",
    
      // Enforce Cross-Origin Opener Policy,
      
    };
  initializeApp(firebaseConfig)
const auth = getAuth()

const[user,setUser]=useState(false)

  return (

    <AuthContext.Provider value={[user,setUser]}>

    <div className="App">
      <Navbar/>

     chat_app
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path ='/SignIn.jsx' element={<SignIn/>}/>
     </Routes>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
