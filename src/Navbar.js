import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import { getAuth,signOut} from "firebase/auth";

import './App.css'


const Navbar = () => {

  const auth = getAuth();
  const signuserOut=()=>{
    signOut(auth).then(() => {
        // Sign-ouconst successful.
        console.log("sign-out successful")
    }).catch((error) => {
        // An error happened.
        console.log("sign-out unsuccessful")
      });
      console.log("ho gya signout")
  }

const[user,setUser]=useState(false)

const logIn=()=>{

    setUser(true)
}
    const logOut=()=>{
      signuserOut()
    setUser(false)
    }


  return (
    <div className='nav'>
    <div className='btn'>
    <Link to={`/SignIn.jsx`}>Your Name</Link>
    <button onClick={logIn}>log-in</button>
        <button onClick={logOut}>log-out</button>
    </div>
      
    </div>
  )
}

export default Navbar
