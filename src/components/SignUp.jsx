import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router'


function SignUp() {
    const auth=getAuth()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()


    const handleSignup= async(e)=>{
      e.preventDefault()
        const userCredential= createUserWithEmailAndPassword(auth,email,password)
        console.log(userCredential)
        const user=userCredential.user
    //    localStorage.setItem('token',user.accessToken)
    //    localStorage.setItem('user',JSON.stringify(user))
       navigate('/SignIn')
    }
  return (
    <div>
      <h1>Signup Here</h1>
      <form onSubmit={handleSignup} >
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
    </div>
  )
}

export default SignUp
