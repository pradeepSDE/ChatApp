import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../App"
import { auth } from "../App";
import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";
import '../msgcon.css'

const Chats = () => {
  const [chats, setChats] = useState([]);
  const {currentUser}=useContext(AuthContext)
  const {dispatch}=useContext(ChatContext)
  console.log(currentUser)
  //   const { dispatch } = useContext(ChatContext);
  
//   try {
try {
    var uid  = currentUser.uid
} catch (error) {
    console.log(error)
}



    useEffect(() => {
        const getChats = async() => {
          try{ const unsub = await onSnapshot(doc(db, "userChats", uid), (doc) => {
            setChats(doc.data());
          });
    
          return () => {
            unsub();
          };
        }catch(err){
            console.log(err)
        }
        };
    
        uid && getChats();
      }, [uid]);
      console.log(Object.entries(chats))

//   } catch (error) {
//     console.log(error)
//   }
// console.log(chats[1].userInfo.displayName)
  const handleSelect = (u) => {
    console.log("ok")
  
    dispatch({ type: "CHANGE_USER", payload: u });
};


  return (
    // <>p</>
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} >
          {/* <img src={chat[1].userInfo.photoURL} alt="" /> */}
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;