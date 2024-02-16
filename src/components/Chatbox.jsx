import React from "react";
import Chat from "./Chat";
import Messages from "../Messages";
import Inputmsg from "./Inputmsg";

const Chatbox = () => {
  return (
    <div className="flex flex-col h-screen">
      <Chat />
    </div>
  );
};

export default Chatbox;
