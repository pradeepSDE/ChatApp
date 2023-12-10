import React, { useContext, useState } from 'react'
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider,signInWithEmailAndPassword,createUserWithEmailAndPassword,getAuth,signInWithPopup, signInWithRedirect, signOut} from "firebase/auth";
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";


const SignIn = () => {
const [user,setUser]=useContext(AuthContext)
const provider = new GoogleAuthProvider();
const auth = getAuth();

const navigate=useNavigate();

    const handleGoogleSignin=()=>{
        signInWithRedirect(auth,provider);
        // signInWithPopup(auth,provider);
         console.log('uhuh')
         setUser(true)
         console.log(user)
    }

    const handleFormSubmit= async(e)=>{
      e.preventDefault();
      try {
       const userCredential = await  signInWithEmailAndPassword(auth, email, password)
       console.log(userCredential)
       const user=userCredential.user
       localStorage.setItem('token',user.accessToken)
       localStorage.setItem('user',JSON.stringify(user))
       navigate('/private')
        
      } catch (error) {
        console.error(error)
      }
    }

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

      

  return (
    <>

    <form onSubmit={handleFormSubmit}>
      <input  
      type="text" 
      placeholder='email ID'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}/>
      <br/>

      <input 
      type="password"
       placeholder='password...'
       value={password}
      onChange={(e)=>setPassword(e.target.value)}
       />
      <br/>
      <button >Submit</button>
    </form>
    new to chat <Link to={'/signUp'}> SignUp  </Link>
      
      <GoogleButton onClick={handleGoogleSignin}/>

    </>
  )
}



export default SignIn
