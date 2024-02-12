import React, { useContext, useState } from 'react'
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider,signInWithEmailAndPassword,getAuth,signInWithPopup, signInWithRedirect, signOut} from "firebase/auth";
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import  { ClipLoader } from 'react-spinners';
import { Bars } from 'react-loader-spinner';


const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const[error,setError]=useState(false);
  const auth = getAuth();
  const navigate=useNavigate();
  
  
  const handleGoogleSignin=()=>{
    setLoading(true);
    signInWithRedirect(auth,provider);
    // signInWithPopup(auth,provider);
    console.log('uhuh')
    
  
  }
  
  const {currentUser}= useContext(AuthContext)
  const handleFormSubmit= async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      console.log(loading)
      const userCredential = await  signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      const Authuser=userCredential.user
      localStorage.setItem('token',Authuser.accessToken)
       localStorage.setItem('user',JSON.stringify(Authuser))
       console.log(Authuser)
       
       console.log(currentUser)
       setLoading(false)
       navigate('/private')
        
      } catch (error) {
        setLoading(false)
        setError(true)
        console.error(error)
        
      }
    }
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

  if(loading  ){
      return <div className=''>

        <div className='flex items-center justify-center'>

        <h1 className='font-mono text-3xl mt-1.5 font-bold '>Logging you in...</h1>
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
 <marquee behavior=""  className='font-semibold font-sans text-blue-400 ' direction="">SignIn with google is currently unavailable..</marquee>

 <div className="container flex flex-col mx-auto bg-white rounded-lg  my-5">
           <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
      <div className="flex items-center justify-center w-full lg:p-12">
        <div className="flex items-center xl:p-10">
          <form onSubmit={handleFormSubmit} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
            <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
            <p className="mb-4 text-grey-700">Enter your email and password</p>
            
           {error &&  <div className='bg-red-200 p-2 rounded-2xl  '>
             <p className=' text-sm font-semibold px-6 py-2 text-grey-700'>Incorrect username or password </p>
            
            </div>
            }
            <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
              <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt=""/>
              Sign in with Google
            </a>
            <div className="flex items-center mb-3">
              <hr className="h-0 border-b border-solid border-grey-500 grow"/>
              <p className="mx-4 text-grey-600">or</p>
              <hr className="h-0 border-b border-solid border-grey-500 grow"/>
            </div>
            <label for="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
            <input id="email" 
            type="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <label for="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
            <input id="password"
             type="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}/>
            
            <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-blue-500">Sign In</button>
            <p className="text-sm leading-relaxed text-grey-900">Not registered yet? <Link to={'/signUp'} className="font-bold  underline text-grey-700" >SignUp</Link></p>
          </form>
        </div>
      </div>
    </div>
        </div>
        


{/* 
        <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 ">
           <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
      <div className="flex items-center  justify-center w-full lg:p-12">
        <div className="flex  items-center xl:p-10">
          <form  onSubmit={handleFormSubmit}
          className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
            <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
            <p className="mb-4 text-grey-700">Enter your email and password</p>

           {error &&  <div className='bg-red-200 p-2 rounded-2xl  '>
             <p className=' text-sm font-semibold px-6 py-2 text-grey-700'>Incorrect username or password </p>
            
            </div>
            }
            <label for="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
            <input id="email" type="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>

            <label for="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
            <input id="password" type="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            
            <button className="w-full  bg-blue-500 hover:bg-sky-700 px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Sign In</button>
            <p className="text-sm leading-relaxed text-grey-900">Not registered yet?<span> </span>
            <Link to={'/signUp'} className="font-bold  underline text-grey-700" >SignUp</Link><span> </span>
             
              and Create an Account</p>
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


export default SignIn
