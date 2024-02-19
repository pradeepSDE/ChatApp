import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../App";

import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";
import "../msgcon.css";
import { useNavigate } from "react-router";
import { MagnifyingGlass } from "react-loader-spinner";

const RandomUserChats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  const w = windowSize.innerWidth;

  try {
    var uid = currentUser.uid;
  } catch (error) {
    console.log(error);
  }
  const getRandomUsers = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {});
    setLoading(false);
  };

  useEffect(() => {
    const getRandomUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const Chatobj = await querySnapshot.docs.map((doc) => ({
          id: doc.id,
          displayName: doc.data().displayName,
          email: doc.email,
        }));
        
        setChats(Chatobj);

        return () => {
          querySnapshot();
        };
      } catch (error) {
        console.log(error);
      }
    };

    uid && getRandomUsers();
  }, [uid]);
  const handleSelect = (u) => {

    dispatch({ type: "CHANGE_USER", payload: u });
    if (w < 700) {
      navigate("/chatBox");
    }
  };


  return (
    // <>p</>
    <div className=" overflow-y-hidden">
      <div className="mx-auto ml-48">
        {loading && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#007FFF"
          />
        )}
      </div>
      {Object.entries(chats)?.map((chat) => (
        <div
          className=" rounded-xl overflow-y-auto bg-white hover:bg-slate-200 p-1.5 mt-2"
          key={chat[0]}
          onClick={() => handleSelect(chat[1])}
        >
          {/* <img src={chat[1].userInfo.photoURL} alt="" /> */}
          <div className="flex   items-center">
            {/* <p>{chat[1].displayName}</p> */}
            <div>
              <img
                className="avatar avatr border-1 border-slate-200  "
                src={chat[1].photoURL}
                alt="img"
              />
            </div>
            <div className="flex flex-col justify-center overflow-x-hidden  items-center ml-9">
              <span className="text-2xl mt-2 font-sans font-semibold">
                {chat[1].displayName}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RandomUserChats;
