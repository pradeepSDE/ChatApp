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
    try {
      
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
    } catch (error) {
      alert("please select a user to chat with")
    }
  }
  return (
    <>
      


  <div className="inputbox  flex w-full  sticky bottom-0  left-0 right-0 z-0 ">
<div className='flex items-center justify-center w-full h-14 bg-gray-200 px-4 py-2 rounded-lg'>


 <input value={text}  onChange={(e)=>SetText(e.target.value)} 
 className="messages  w-full m px-3 py-2 rounded-md " type="text" name="msg" id="" placeholder='enter your message'/>
<button 
 className="   ml-4  lg:inline-block   py-2 px-4 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" 
 onClick={handleSend}>  
    Send
</button>
 </div>
</div>



    
    </>
  )
}

export default Inputmsg
