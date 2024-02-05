import React from 'react'
import '../msgcon.css'
import Search from './Search'
import Chats from './Chats'
import Chat from './Chat'
import Messages from '../Messages'
import Inputmsg from './Inputmsg'
const MessangerConsole = () => {


  return (
    <>
     <div className="messageconsole">

        <div className="profiles   border-2 border-slate-200 ">
<Search/>
<Chats/>

        </div>
        <div className="chat overflow-y-auto">

                <Chat/>

                <Messages/>
                <Inputmsg/>

        </div>
        </div> 
    </>
  )
}

export default MessangerConsole
