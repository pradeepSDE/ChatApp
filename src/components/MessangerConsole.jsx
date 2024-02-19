import React from "react";
import "../msgcon.css";
import Search from "./Search";
import Chat from "./Chat";
import Accounts from "./Accounts";
const MessangerConsole = () => {
  return (
    <>
      <div className="messageconsole">
        <div className="profiles hidden1 lg:block  overflow-y-scroll  border-2 border-slate-200 ">
          <Search />
        </div>
        <div className="chat hidden  lg:block overflow-y-auto">
          <Chat />
        </div>
      </div>
    </>
  );
};

export default MessangerConsole;
