import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatContext from './context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import Message from './components/Message'
import {db} from './App';

const Messages = () => {

    const [messages,setMessages]=useState([])
    const [err,setErr]=useState(false)
    const {data} = useContext(ChatContext)
    console.log(data)
    

useEffect(()=>{

    try {
        
         const  unsub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists() && setMessages(doc.data().messages)

    
            return ()=>{
                unsub();
            }
        })
    } catch (error) {
        setErr(err)
    }

},[data.chatId,err])

// await messages
console.log(messages)
console.log(err)

// setMessages('')
  return (
    <>
     {messages.map((m)=>
        <Message messages={m}  key={m.id}/>
        
     )} 
    </>
  )
}

export default Messages
