
import './App.css';
import Home from './Home';
import About from './About';
import Navbar from './Navbar';
import {Routes,Route} from 'react-router-dom';
import SignIn from './components/SignIn';
// import {firebase} from './firebase'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
// const express = require('express');
// const helmet = require('helmet');

// const app = express();

// // Use the helmet middleware to set the Cross-Origin-Opener-Policy header
// app.use(
//   helmet({
//     crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' } // or 'same-origin-allow-popups' or 'unsafe-none'
//   })
// );

// // Your other server configurations and routes...

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



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



  return (
    <div className="App">
      <Navbar/>

     chat_app
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path ='/SignIn.jsx' element={<SignIn/>}/>
     </Routes>
    </div>
  );
}

export default App;
