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
// import firebase form 'firebase/app'
import "../index.css";
import { db,auth } from "../App";
import { getAuth, getIdToken,onAuthStateChanged,updateProfile } from "firebase/auth";
import firebase from 'firebase/compat/app'
import AuthContext from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router";





const Search = () => {
  const navigate=useNavigate();
 
  const [username, Setusername] = useState("");
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);
  const authUser = JSON.parse(localStorage.getItem("user"));
  const {currentUser}= useContext(AuthContext)
  var w = window.innerWidth;
  console.log(w)
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
    navigate('/chatBox')
    
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

  return (
    <>
      {err && <span>error ho giyo</span>}
      <div className="flex-1 overflow-hidden">


      <div className="p-2.5    bg-white  flex items-center justify-start">
        <h1 className="text-2xl h-full pl-2 font-sans font-bold ">Chats</h1>

      </div>

      <div className="rounded-4xl h-full  ">
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
    </>
  );
};

export default Search;
