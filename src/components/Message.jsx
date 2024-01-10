import React, { useState } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import ChatContext from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../App'
import { v4 as uuid } from 'uuid'

const Message = ({message}) => {
    console.log(message)
const[text,SetText]=useState("")
const[img,Setimg]=useState(null)

    const {currentUser}=useContext(AuthContext)
    const {data}=useContext(ChatContext)


    const handleSend=async()=>{
        await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
                id:uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
            }),
        });
    }
  return (
    <div>

message bhejo
  <div className="inputbox">
 <input onChange={(e)=>SetText(e.target.value)} 
 className="messages" type="text" name="msg" id="" placeholder='enter your message'/>
<button 
 className="hidden lg:inline-block  py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" 
 onClick={handleSend}>  
    Send
</button>
<span>yeah</span>
</div>



    </div>
  )
}

export default Message
