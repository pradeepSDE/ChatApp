
import './App.css';
import About from './About';
import Navbar from './Navbar';
import {Routes,Route, Outlet,} from 'react-router-dom';
import SignIn from './components/SignIn';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AuthContext from './context/AuthContext'
import {useState} from 'react'
// import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/SignUp';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import Chatbox from './components/Chatbox';
import { getMessaging } from "firebase/messaging/sw";

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
 const app= initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app);
  const storage = getStorage(app);
  const messaging = getMessaging(app);

function App() {




  return (
<>
    <div className="App">
      
      <Navbar/>
     
     <Routes>
      <Route exact path='/' element={<SignIn/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path ='/SignIn' element={<SignIn/>}/>

   

      <Route exact path = '/chatBox'  element={<Chatbox/>}>
        {/* <Outlet/> */}
      </Route>
   

      <Route path='/private' element={<PrivateRoute/>}>
      <Route path='/private' element={<UserProfile/>}/>
      </Route>
      <Route exact path='/signUp' element={<SignUp/>}/>
   </Routes>
    </div>
  
</>
       
       
       
  );
}
export {db,auth,storage,messaging} ;
export default App;

