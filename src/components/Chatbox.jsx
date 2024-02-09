import React from 'react'
import Chat from './Chat'
import Messages from '../Messages'
import Inputmsg from './Inputmsg'

const Chatbox = () => {
  return (
    <div>
      <Chat/>
     <Messages/>
     <Inputmsg/>
    </div>
  )
}

export default Chatbox