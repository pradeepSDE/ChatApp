import React, { useState } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import ChatContext from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../App'
import { v4 as uuid } from 'uuid'

const Message = ({messages}) => {
    console.log(messages)
    const {currentUser}=useContext(AuthContext)
    const {data}=useContext(ChatContext)


   
    
  return (
    <>


  <div className={`message ${messages.senderId==currentUser.uid && "owner"}`}>
 <div className='messsageInfo'>
  <p>{messages.text}</p>
 </div>
  
</div>



    </>
  )
}

export default Message
