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
    console.log(currentUser)
    const {data}=useContext(ChatContext)

console.log(messages.senderId)
console.log(currentUser.uid)
   
    
  return (
    <>
   
   {/* <div class="bg-slate-800 h-[29rem] relative">
        {/* <!-- Chatbox-body message-box--> */}
   {/* <div class="px-4 py-8"> */}
    {/* <div class="flex gap-3"> */}
                    {/* <!-- Icon image --> */}
     {/* <div class="w-12 h-12 rounded-full bg-rose-400 p-0.5"> */}
      {/* <img src="https://pbs.twimg.com/profile_images/1397151839850729475/1FvqSN6H_400x400.jpg" alt="" class="h-full w-full object-cover rounded-full"/> */}
      {/* </div> */}
                    {/* <!-- Text Message --> */}
     {/* <div class="text-sm p-5 w-[75%] bg-slate-600 text-slate-100 rounded-lg relative before:absolute before:content-[''] before:w-3 before:h-3 before:bg-slate-600 before:rotate-45 before: before:-left-1 before:top-4"> */}
      {/* <p>{messages.text}</p> */}
      
      {/* </div> */}
  {/* </div> */}
{/* </div> */}
{/* </div> */} 
  
  <div className={`message overflow-y-auto  p-3 flex ${messages.senderId === currentUser.uid ? "justify-end" : "justify-start"} ${messages.senderId === currentUser.uid && "owner"}  `}>
     
    <div className= {`img   w-12 h-12 rounded-full bg-rose-400 p-0.5  flex justify-start ${messages.senderId===currentUser.uid && "  owner"} `}>
    <img  src="https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain" alt="" />
    </div>
 <div className="messsageInfo p-1.5">
  <p>{messages.text}</p>
 </div>
     
</div>
      
  



    </>
  )
}

export default Message
