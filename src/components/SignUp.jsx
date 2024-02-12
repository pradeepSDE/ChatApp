import { createUserWithEmailAndPassword, getAuth,updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import {db,storage} from '../App'
import { Bars } from 'react-loader-spinner';

import 'firebase/auth';


function SignUp() {
    const auth=getAuth()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [displayName,setdisplayName]=useState('')
    const navigate=useNavigate()
    const [Loading,setLoading]=useState(false)
    const [error,seterror]=useState(false)


    const handleSignup= async(e)=>{
      e.preventDefault()
      
      setLoading(true)
      const userCredential= await createUserWithEmailAndPassword(auth,email,password)
      .then(async (res) => {
       console.log(res)
        const user = res.user;

        await updateProfile(user, {
          displayName: displayName,
        });

         
        await setDoc(doc(db,"users",user.uid),{
          displayName,
          email,
          password,
           uid:user.uid,
        });


    await setDoc(doc(db, "userChats", user.uid), {});
   setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
       console.log(err)
       seterror(true)
      });
      // navigate('/SignIn')
      
    }

    if(Loading  ){
      return <div>

        <div className='flex items-center justify-center'>

        <h1 className='font-mono text-3xl mt-1.5 font-bold '>Creating your acount...</h1>
        </div>
      <div className='h-screen flex items-center justify-center'>
        <Bars 
      height="150"
      width="150"
      color="#00BFFF"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      /></div>
      </div> 
    }
    else{




  return (
    <>
    <body className="bg-white rounded-lg ">    
    <div className="container flex flex-col mx-auto bg-white rounded-lg  pt-5">
       <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
  <div className="flex items-center justify-center w-full lg:p-12">
    <div className="flex items-center   xl:p-10">
      <form  onSubmit={handleSignup}
      className="flex flex-col w-full  h-full pb-6 text-center bg-white rounded-3xl">
        <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign Up</h3>
        <p className="mb-4 text-grey-700">Enter your email and password</p>
        
        {error &&  <div className='bg-red-200 p-2 rounded-2xl  '>
             <p className=' text-sm font-semibold px-6 py-2 text-grey-700'>Some error occurred... </p>
            
            </div>
            }
        
        <label for="email" className="mb-2 text-sm text-start text-grey-900">DisplayName</label>
        <input id="email" type="displayName" placeholder="xyz" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
        value={displayName}
        onChange={(e)=>setdisplayName(e.target.value)}/>

        <label for="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
        <input id="email" type="email" placeholder="xyz@gmail.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>


        <label for="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
        <label for="password" className="mb-2 text-xs text-start text-slate-400 font-thin  ">*should be atleast 6 characters</label>
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
}

export default SignUp
