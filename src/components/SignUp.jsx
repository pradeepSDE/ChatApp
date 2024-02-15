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

    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <h1 className='text-2xl  font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-indigo-800'>P-Chat</h1>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create New account
              </h1>
              {error &&  <div className='bg-red-200 p-2 rounded-2xl  '>
             <p className=' text-sm font-semibold px-6 py-2 text-grey-700'>Some error occurred... </p>
            
            </div>
            }
              <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSignup}>
                  <div>
                      <label for="displayName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input 
                      type="Username" 
                      name="Username" 
                      id="displayName" 
                      value={displayName}
                      onChange={(e)=>setdisplayName(e.target.value)} 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)} 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?  <Link to={'/SignIn'} className="font-bold text-grey-700 underline" >  SignUp  </Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

    {/* <div className="container flex flex-col mx-auto bg-white rounded-lg   my-5">
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
        
        <button className="w-full bg-blue-500 hover:bg-sky-700 px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Sign Up</button>
        <p className="text-sm leading-relaxed text-grey-900">Already have an account? 
        <Link to={'/SignIn'} className="font-bold text-grey-700" >  SignIn  </Link>
         </p>
      </form>
    </div>
          </div>
</div>
    </div> */}
</body>

</>


  )
    }
}

export default SignUp
