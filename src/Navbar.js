import React, { useContext } from 'react'
import { Link,useNavigate} from "react-router-dom";
import { getAuth,signOut} from "firebase/auth";
import './App.css'
import AuthContext from './context/AuthContext';


const Navbar = () => {
  const[user,setUser]=useContext(AuthContext)
  const navigate =useNavigate();

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

    const handleLogout = async () => {
      try {
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/SignIn");
      } catch (error) {
        console.error(error);
      }
    }
  


  return (

    
    <div className='nav'>
    <div>
    <h1>Logo</h1>
    </div>
    <div className='button'>
    
    {user? <button className='btn' onClick={logOut}>log-out</button>:  <Link to="/SignIn">signinpage</Link>}
     <button><Link to={`/`} >Home</Link> </button>
     <button onClick={handleLogout}>LogOut</button>
    </div>
      
    </div>
  )
}
export default Navbar
