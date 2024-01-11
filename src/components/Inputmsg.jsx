import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { db } from '../App';
import ChatContext from '../context/ChatContext';
import { v4 as uuid } from 'uuid'
import AuthContext from '../context/AuthContext';
const Inputmsg = () => {
  const[text,SetText]=useState('')
  const { data }= useContext(ChatContext)
const { currentUser}= useContext(AuthContext)

  const handleSend=async()=>{
    await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
            id:uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
        }),
    });

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]:serverTimestamp(),
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]:serverTimestamp(),
    })
    SetText('')
  }
  return (
    <div>
       <div>


  <div className="inputbox absolute bottom-0   ">
 <input value={text} onChange={(e)=>SetText(e.target.value)} 
 className="messages" type="text" name="msg" id="" placeholder='enter your message'/>
<button 
 className="hidden lg:inline-block  py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" 
 onClick={handleSend}>  
    Send
</button>
</div>



    </div>
    </div>
  )
}

export default Inputmsg
