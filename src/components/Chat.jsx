import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ChatContext from "../context/ChatContext";
import Messages from "../Messages";
import Inputmsg from "./Inputmsg";
import Nochatselect from "./Nochatselect";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="msgNavbar h-full -z-50  flex flex-col">
      {/* <!-- This is an example component --> */}
      <div class=" -z-10 h-full flex  ">
        {data.user.displayName && (
          <nav class=" w-full   fixed  border-b-2 border-b-slate-200 bg-white border-2 border-slate-200   p-3.5 rounded-md">
            <div className="flex ">
              <img src={data.user?.photoURL} className="avatar" alt="N/a" />
              <div class="container   mx-auto flex  flex-wrap items-center justify-between">
                <a href="#" class="flex ">
                  <span class="self-center text-2xl font-semibold whitespace-nowrap">
                    {data.user?.displayName}
                  </span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>

      <div className="flex flex-col -z-50  flex-grow-1">
        <Messages />
      </div>

      <div
        className={` flex  ${data.user.displayName ? "send " : "fixed ml-96 mt-48"} flex-col`}
      >
        {data.user.displayName ? <Inputmsg /> : <Nochatselect />}
      </div>
    </div>
  );
};

export default Chat;
