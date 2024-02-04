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





const Search = () => {
 
  const [username, Setusername] = useState("");
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);
  const authUser = JSON.parse(localStorage.getItem("user"));
  const {currentUser}= useContext(AuthContext)

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

      <div className="">
        <div className="w-full p-2 mt-1 font-sans ">
          <input
          className="border-solid border-red-500 p-2 w-full text-xl font-sans"
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => Setusername(e.target.value)}
            value={username}
          />
        </div>

        {user ? (
          <div className=" flex flex-start items-center border-black bg-cyan-200 hover:bg-cyan-300 p-2.5 border-b-black " onClick={handleSelect}>
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
      </div>
    </>
  );
};

export default Search;
