import React from "react";
import Chat from "./Chat";
import Messages from "../Messages";
import Inputmsg from "./Inputmsg";

const Chatbox = () => {
  return (
    <div className="flex flex-col h-screen  mb-5">
      <Chat />
    </div>
  );
};

export default Chatbox;
