import React from 'react'
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider,getAuth,signInWithPopup, signInWithRedirect, signOut} from "firebase/auth";



const SignIn = () => {

const provider = new GoogleAuthProvider();
const auth = getAuth();

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });


    const handleGoogleSignin=()=>{
        // signInWithRedirect(auth,provider);
        signInWithPopup(auth,provider);
         console.log('uhuh')
    }

    

  return (
    <div>
      signin 
      <GoogleButton onClick={handleGoogleSignin}/>

    </div>
  )
}



export default SignIn
