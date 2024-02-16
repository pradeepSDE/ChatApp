import React from "react";
import { useContext } from "react";
import ChatContext from "../context/ChatContext";
import Messages from "../Messages";
import Inputmsg from "./Inputmsg";
import Nochatselect from "./Nochatselect";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);
  return (
    <div className="msgNavbar h-full  flex flex-col   overflow-y-scroll">
      {/* <!-- This is an example component --> */}
      <div class=" relative flex  ">
        {data.user.displayName && (
          <nav class=" w-full  z-10    bg-white border-2 border-slate-200   p-3.5 rounded-md">
            <div class="container   mx-auto flex  flex-wrap items-center justify-between">
              <a href="#" class="flex ">
                <span class="self-center text-2xl font-semibold whitespace-nowrap">
                  {data.user?.displayName}
                </span>
              </a>
            </div>
          </nav>
        )}
      </div>

      <div className="flex flex-col h-full overflow-y-scroll flex-grow-1">
        <Messages />
      </div>

      <div className={`send  flex h- flex-col`}>
        {data.user.displayName ? <Inputmsg /> : <Nochatselect />}
      </div>
    </div>
  );
};

export default Chat;
