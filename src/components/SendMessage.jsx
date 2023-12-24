import React, { useState } from "react";
import { auth, db } from "../App";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
const[message,setMessage]=useState('')

const handleSend = async(ev)=>{
    ev.preventDefault();
    if (message.trim()===''){
            alert("enter valid message ")
            return;
        }

        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
          text: message,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
        });
        setMessage("");
    };





  return (
    <form className="send-message" onSubmit={(ev)=>handleSend(ev)}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        onChange={(e)=>setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};
export default SendMessage;