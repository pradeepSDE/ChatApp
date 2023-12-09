import React, { useContext } from 'react'
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider,getAuth,signInWithPopup, signInWithRedirect, signOut} from "firebase/auth";
import AuthContext from '../context/AuthContext';


const SignIn = () => {
const [user,setUser]=useContext(AuthContext)
const provider = new GoogleAuthProvider();
const auth = getAuth();

    const handleGoogleSignin=()=>{
        // signInWithRedirect(auth,provider);
        signInWithPopup(auth,provider);
         console.log('uhuh')
         setUser(true)
    }

    

  return (
    <div>
      signin 
      <GoogleButton onClick={handleGoogleSignin}/>

    </div>
  )
}



export default SignIn
