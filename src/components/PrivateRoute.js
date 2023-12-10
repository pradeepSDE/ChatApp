import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import AuthContext from '../context/AuthContext'
import {Navigate} from 'react-router-dom'

function PrivateRoute() {


    const token = localStorage.getItem('token');
    const tokenType  = typeof(token)
    console.log(tokenType)

    return (

      token ? <Outlet /> : <Navigate to="/SignIn" />

    
    )
}

// if(token){
//   return <Outlet/>
//   }
//   else{
//       return("user not logged in")
//   }






    // const [user,setUser]=useContext(AuthContext)
    
    // console.log(user)
    // 
//   return (
//     <div>
//         privateroute ka componeent
//       private hai baba

//       <Outlet></Outlet>

//     </div>
//   )


// }

export default PrivateRoute

