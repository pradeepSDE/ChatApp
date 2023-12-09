import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { getAuth,signOut} from "firebase/auth";
import './App.css'
import AuthContext from './context/AuthContext';


const Navbar = () => {
  const[user,setUser]=useContext(AuthContext)

  const auth = getAuth();
  const signuserOut=()=>{
    signOut(auth).then(() => {
        // Sign-ouconst successful.
        console.log("sign-out successful")
    }).catch((error) => {
        // An error happened.
        console.log("sign-out unsuccessful")
      });
      console.log("signout")
  }


    const logOut=()=>{
      signuserOut()
    setUser(false)
    }


  return (
    <div className='nav filter-blur flex-1 justify-center'>
    <div className='btn-primary'>
    
    <br/>

    {user? <button className='btn-primary' onClick={logOut}>log-out</button>:  <Link to={`/SignIn.jsx`}>signinpage</Link>}
     
    </div>
      
    </div>
  )
}
export default Navbar
