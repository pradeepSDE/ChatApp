import React from "react";
import Chat from "./Chat";
import Messages from "../Messages";
import Inputmsg from "./Inputmsg";
import Chatmob  from './Chatmob'

const Chatbox = () => {
  return (
    <div className="flex h-screen flex-col chatBox ">
      <div className=" h-full">
      <Chatmob/>
        
      </div>
    </div>
  );
};

export default Chatbox;
