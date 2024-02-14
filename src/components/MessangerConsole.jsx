import React from 'react'
import '../msgcon.css'
import Search from './Search'
import Chats from './Chats'
import Chat from './Chat'
import Messages from '../Messages'
import Inputmsg from './Inputmsg'
import RandomUserChats from './RandomUserChats'
const MessangerConsole = () => {


  return (
    <>  
    {/* <div className='lg:hidden  '>
<Search/>
    </div> */}
     <div className="messageconsole">
        <div className="profiles hidden1 lg:block  overflow-y-scroll  border-2 border-slate-200 ">
<Search/>


        </div>
        <div className="chat hidden lg:block overflow-y-auto">

                <Chat/>
{/* 
                <Messages/>
                <Inputmsg/> */}

        </div>
        </div> 
    </>
  )
}

export default MessangerConsole
