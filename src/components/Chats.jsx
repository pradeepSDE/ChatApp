import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../App"
import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";
import '../msgcon.css'
import { useNavigate } from "react-router";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const {currentUser}=useContext(AuthContext)
  const {dispatch}=useContext(ChatContext)
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  
function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
const w = windowSize.innerWidth;

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
      
  const handleSelect = (u) => {
   
    dispatch({ type: "CHANGE_USER", payload: u });
    if(w<700){
      
      navigate('/chatBox')
    }
};


  return (
  <>
    
    <div className=" ">
      <p></p>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className=" rounded-xl bg-white hover:bg-slate-200 p-1.5 mt-2" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} >
          <div className="flex  ">

          <div className="items-center flex">
          <img
              className="avatar "
              src="https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain"
              alt="img"
              />
          </div>
          <div className="flex flex-col justify-center items-center ml-9">

            <span className="text-2xl mt-2 font-sans font-semibold">{chat[1].userInfo.displayName}</span>
            <p className="font-light mt-1.5">{chat[1].lastMessage?.text}</p>
            
          </div>
      </div>
        </div>
      ))}
    </div>
   
  </>
  );
};

export default Chats;