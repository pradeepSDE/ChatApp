import React from 'react'
import '../msgcon.css'
import Search from './Search'
import Chats from './Chats'
const MessangerConsole = () => {


  return (
    <>
     <div className="messageconsole">

        <div className="profiles">
<Search/>
{/* <Chats/> */}

        </div>
        <div className="chat">
<div className="inputbox">

 
        <input  className="messages" type="text" name="msg" id="" placeholder='enter your message'/>
     <button className="hidden lg:inline-block  py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" >Send</button>
       


</div>
        </div>
        </div> 
    </>
  )
}

export default MessangerConsole
