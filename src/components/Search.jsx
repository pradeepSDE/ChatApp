import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { FaSearch } from 'react-icons/fa';
import "../index.css";
import { db,auth } from "../App";
import { getAuth, getIdToken,onAuthStateChanged,updateProfile } from "firebase/auth";
import firebase from 'firebase/compat/app'
import AuthContext from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router";
import RandomUserChats from "./RandomUserChats";
import Chats from "./Chats";
import ToggleButton from 'react-toggle-button'





const Search = () => {
  const navigate=useNavigate();
 
  const [username, Setusername] = useState("");
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);
  const authUser = JSON.parse(localStorage.getItem("user"));
  const {currentUser}= useContext(AuthContext)
  const[Random,setRandom]=useState(false)
  
    
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
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    console.log("handleSeartch chal;a");
    console.log(currentUser)
    
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }

  };

  const handleKey = (e) => {
    
    e.code === "Enter" && handleSearch();
  };

  console.log(authUser);


  const handleSelect = async () => {
   console.log(w)
    if(w<600){
      console.log("width")
      navigate('/chatBox')
    }
    
    
    console.log("handleSelect call");
    console.log(user.uid)
    console.log(authUser.displayName)
    console.log(authUser.uid)
  
  
    const combID =
      authUser.uid > user.uid
        ? authUser.uid + user.uid
        : user.uid + authUser.uid;
    console.log(combID);
    const docRef = doc(db, "chats", combID);

    try {
      const res = await getDoc(docRef);
      console.log(res.exists());

      if (!res.exists()) {

        await setDoc(docRef, { messages: [] });

        await updateDoc(doc(db, "userChats", authUser.uid), {
          [combID + ".userInfo"]: {
            uid: user.uid,
            displayName:user.displayName,
          },
          [combID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combID + ".userInfo"]: {
            uid: authUser.uid,
            displayName: authUser.displayName,
          },
          [combID + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setErr(true);
      console.log(error);
    }
    setUser(null);
    Setusername("");
  };
  
  const [isChecked, setIsChecked] = useState(false);
  
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  
  useEffect(()=>{
  isChecked? setRandom(false):setRandom(true)
  },[isChecked])

  return (
    <>
      {err && <span>error ho giyo</span>}
      <div className="flex-1 pb-4  overflow-hidden">

      <div className="p-2.5 border-b-2  border-slate-200  bg-white  flex items-center justify-start">
        <h1 className="text-2xl h-full pl-2 font-sans font-bold ">Chats</h1>
        <div className="flex  justify-center items-center ml-auto">

    

        
        <label htmlFor="toggle" className="font-semibold font-sans text-lg  p-2 ">Random Users?</label>

        <label htmlFor="toggle" className="bg-slate-200 border-double border-2 border-slate-400 cursor-pointer relative w-16 h-8 rounded-full">
          <input 
          type="checkbox"  
          name="toggle" 
          id="toggle" 
          className="sr-only peer "
          checked={isChecked}
          onChange={handleToggle} 
          />
          <span className="w-2/5 peer-checked:left-1 h-4/5 bg-blue-500 absolute rounded-full peer-checked:bg-blue-200 peer-checked:right-11 top-1  transition-all duration-700  "></span>
        </label>
        {/* <input type="checkbox" className=" p-2 ml-auto  appearance-none   h-5 w-5 rounded-full cursor-pointer border-2 border-gray-300 shadow-lg shadow-blue-300 outline-4 outline-red-700 checked:border-blue-500 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500" name="toggle" id="toggle" /> */}

        </div>
    
      {/* <button className="p-2 bg-blue-500 rounded-lg ml-auto text-white" onClick={handleRA}>Random Users</button> */}

      </div>

      <div className="rounded-4xl h-full  ">
        <div className="flex items-center justify-center">
          
        <div className="w-full p-2  font-sans rounded-2xl">
        
          <input
          className=" border-red-500 p-2 rounded-2xl bg-slate-200 w-full text-xl font-sans"
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => Setusername(e.target.value)}
          value={username}
          />
      
        </div>
        <button className="p-2.5 text-white h-10  bg-blue-500 rounded-xl mr-2" onClick={handleSearch}>Search</button>
          </div>

        {user ? (
          <div className=" flex flex-start items-center border-black bg-white hover:bg-slate-200 p-2.5 border-b-black " onClick={handleSelect}>
            <img
              className="avatar "
              src="https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain"
              alt="img"
            />
            <div className="userChatInfom   border-black">
              <span className="font-semibold text-3xl ">{user.displayName}</span>
              <button className="bg-blue-500 rounded-2xl p-2 text-white font-sans ml-20 justify-end ">Add</button>
            </div>
          </div>
        ) : (
          <span></span>
        )}
      </div>

      {/* mobile screen part */}
{/* 
      <div className="p-2.5 lg:hidden  bg-white  flex items-center justify-start">
        <h1 className="text-2xl pl-2 font-sans font-bold ">Chats</h1>

      </div> */}
{/* 
      <div className="rounded-4xl lg:hidden">
        <div className="w-full p-2  font-sans rounded-2xl">
          <input
          className=" border-red-500 p-2 rounded-2xl bg-slate-200 w-full text-xl font-sans"
          type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => Setusername(e.target.value)}
            value={username}
            />
        </div>

        {user ? (
          <div className=" flex flex-start items-center border-black bg-white hover:bg-slate-200 p-2.5 border-b-black " onClick={handleSelect}>
            <img
              className="avatar "
              src="https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain"
              alt="img"
            />
            <div className="userChatInfo border-black">
              <span className="font-semibold text-3xl ">{user.displayName}</span>
            </div>
          </div>
        ) : (
          <span></span>
        )}
      </div> */}
              </div>
              {Random? <RandomUserChats/>:<Chats/>}
    </>
  );
};

export default Search;
