import React from 'react'
import '../msgcon.css'
import Search from './Search'
import Chats from './Chats'
import Chat from './Chat'
import Messages from '../Messages'
const MessangerConsole = () => {


  return (
    <>
     <div className="messageconsole">

        <div className="profiles">
<Search/>
<Chats/>

        </div>
        <div className="chat">

                <Chat/>

                <Messages/>

        </div>
        </div> 
    </>
  )
}

export default MessangerConsole
