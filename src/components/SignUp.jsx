import { createUserWithEmailAndPassword, getAuth,updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import {db,storage} from '../App'

import 'firebase/auth';


function SignUp() {
  



    const auth=getAuth()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [displayName,setdisplayName]=useState('')
    const navigate=useNavigate()


    const handleSignup= async(e)=>{
      e.preventDefault()
      
      
      const userCredential= await createUserWithEmailAndPassword(auth,email,password)
      console.log(userCredential)
      const user=userCredential.user
      try {

        // await updateProfile(userCredential, {
        //   displayName: displayName,
        // });

          
          await setDoc(doc(db,"users",userCredential.user.uid),{
                displayName,
                email,
                password,
               uid: userCredential.user.uid,
              });


          await setDoc(doc(db, "userChats", userCredential.user.uid), {});
          navigate("/");

          await user.reload();
          
        } catch (error) {
          console.log(error)
        }
      

       navigate('/SignIn')
    }
  return (
    <>
    <body className="bg-white rounded-lg ">    
    <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 ">
       <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
  <div className="flex items-center justify-center w-full lg:p-12">
    <div className="flex items-center xl:p-10">
      <form  onSubmit={handleSignup}
      className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
        <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign Up</h3>
        <p className="mb-4 text-grey-700">Enter your email and password</p>
        
        <label for="email" className="mb-2 text-sm text-start text-grey-900">displayName</label>
        <input id="email" type="displayName" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
        value={displayName}
        onChange={(e)=>setdisplayName(e.target.value)}/>

        <label for="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
        <input id="email" type="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>


        <label for="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
        <input id="password" type="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
        
        <button className="w-full bg-blue-500 hover:bg-sky-700 px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Sign In</button>
        <p className="text-sm leading-relaxed text-grey-900">Already have an account? 
        <Link to={'/SignIn'} className="font-bold text-grey-700" >  SignIn  </Link>
         </p>
      </form>
    </div>
          </div>
</div>
    </div>
</body>

</>


  )
}

export default SignUp
