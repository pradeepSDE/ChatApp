import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import ChatContext from "../context/ChatContext";
import Messages from "../Messages";
import Inputmsg from "./Inputmsg";
import Nochatselect from "./Nochatselect";
import { redirect, useParams } from "react-router";
import { Link } from "react-router-dom";

const Chatmob = () => {
  const { data } = useContext(ChatContext);
  console.log(data);

  const handleClick = () => {
    window.location.href = "/private";
  };
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="msgNavbar h-full  flex flex-col">
      {/* <!-- This is an example component --> */}
      <div class=" relative h-full  flex  ">
        {data.user.displayName ? (
          <nav class=" w-full  z-10 fixed  border-b-2 border-b-slate-300 bg-white border-2 border-slate-200   p-3 rounded-md">
            <div class="container   mx-auto flex  flex-wrap items-center">
              <div className={`  w-10 h-10 rounded-full   flex justify-start `}>
                <img src={data.user?.photoURL} alt="" />
              </div>
              <a href="#" class="flex ">
                <span class="self-center text-xl pl-2 font-semibold whitespace-nowrap">
                  {data.user?.displayName} {data.user ? <></> : <p>No User</p>}
                </span>
              </a>
              <div className="flex ml-10">
                <button onClick={handleClick}>
                  <img className="h-8" src="/icons8-back-48.png" alt="nj" />
                </button>
              </div>
            </div>
          </nav>
        ) : (
          <div className="flex flex-col justify-center items-center mx-auto">
            <Link to={"/private"}>
              <img src="/icons8-go-back-50.png" className="p-2.5 mb-5" alt="" />
            </Link>
            <p className="font-sans text-4xl font-semibold rounded-sm  justify-center mx-auto ">
              Go back and select a chat
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col   flex-grow-1">
        <Messages />
      </div>

      <div
        className={` flex send ${data.user.displayName ? "send " : ""} flex-col`}
        ref={ref}
      >
        <Inputmsg />
      </div>
    </div>
  );
};

export default Chatmob;
