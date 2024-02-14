import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../App"
import { auth } from "../App";
import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";
import '../msgcon.css'
import { useNavigate } from "react-router";


const RandomUserChats = () => {
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
const getRandomUsers=async()=>{

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log("object")
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}


    useEffect(() => {


        const getRandomUsers=async()=>{
            
            
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                console.log(querySnapshot)
                          const Chatobj =  await querySnapshot.docs.map(doc => ({
                            
                            id: doc.id, 
                            displayName: doc.data().displayName,
                            email: doc.email // Include ID if needed
                             // Destructure and spread document data
                          }));
                          console.log(Chatobj)
                          setChats(Chatobj)
                        //   await  querySnapshot.forEach((doc) => {
                            
                        //         setChats({ 
                        //            d:doc.data().displayName
                        //         });

                        //         console.log("usetheeffecty")
                        //         console.log("object")
                        //         // doc.data() is never undefined for query doc snapshots
                        //         console.log(doc.data.displayName, " => ", doc.data());
                        //     });

                            return ()=>{
                                querySnapshot();
                            }

            } catch (error) {
                console.log(error)
            }
        }

        
        // const getChats = async() => {
        //   try{ const unsub = await onSnapshot(doc(db, "users"), (doc) => {
        //     setChats(doc.data());
        //     console.log(doc.data)
        //   });
    
        //   return () => {
        //     unsub();
        //   };
        // }catch(err){
        //     console.log(err)
        // }
        // };
    
        uid && getRandomUsers();
      }, [uid]);
      console.log(chats)
  const handleSelect = (u) => {
    console.log("ok")
  
    dispatch({ type: "CHANGE_USER", payload: u });
    if(w<700){

      navigate('/chatBox')
    }
};

if (chats) {
    console.log("true")
} else {
    console.log("false")
}


  return (

    
    // <>p</>
    <div className=" overflow-y-hidden">
    
      {Object.entries(chats)?.map((chat) => (
        <div className=" rounded-xl overflow-y-auto bg-white hover:bg-slate-200 p-1.5 mt-2" key={chat[0]} onClick={()=>handleSelect(chat[1])} >
          {/* <img src={chat[1].userInfo.photoURL} alt="" /> */}
          <div className="flex  ">
       {/* <p>{chat[1].displayName}</p> */}
          <div>
          <img
              className="avatar  "
              src="https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain"
              alt="img"
              />
          </div>
          <div className="flex flex-col justify-center overflow-x-hidden  items-center ml-9">
{/* <span>{chat[1]}</span> */}
            <span className="text-2xl mt-2 font-sans font-semibold">{chat[1].displayName}</span>
            {/* <p className="font-light mt-1.5">{chat[1].lastMessage?.text}</p> */}
            
          </div>
      </div>
        </div>
      ))}
    </div>
  );
};

export default RandomUserChats;