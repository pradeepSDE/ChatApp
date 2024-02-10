import React, { useRef, useState,useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import ChatContext from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db, messaging } from '../App'
import { v4 as uuid } from 'uuid'
import { Messaging } from 'firebase/messaging/sw';
const Message = ({messages}) => {
    // console.log(messages)
    const {currentUser}=useContext(AuthContext)
    // console.log(currentUser)
    const {data}=useContext(ChatContext)

// console.log(messages.senderId)
// console.log(currentUser.uid)
   

const ref = useRef();

useEffect(() => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
  console.log("mai e se")
}, [messages]);




  return (
    <>
  <div    ref={ref} className={`message  object-scale-downn   scroll-smooth overflow-y-auto p-3 flex items-center p-2.5 ${messages.senderId === currentUser.uid ? "justify-end " : "justify-start"} ${messages.senderId === currentUser.uid && "owner"}  `}>
     
    <div className= {`  w-12 h-12 rounded-full bg-rose-400 p-0.5  flex justify-start ${messages.senderId===currentUser.uid? "hidden":""} `}>
    <img  src="https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain   " alt="" />
    </div>
 <div className={`messsageInfo rounded-3xl text-xl  p-2.5 pl-4 pr-4 m-2  ${messages.senderId === currentUser.uid ? " bg-blue-500 text-white" : " bg-slate-200"} p-1.5`}>
  <p>{messages.text}</p>
 </div>
     
</div>

    </>
  )
}

export default Message
