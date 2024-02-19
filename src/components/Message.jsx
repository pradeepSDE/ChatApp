import React, { useRef, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";
const Message = ({ messages }) => {
  // console.log(messages)
  const { currentUser } = useContext(AuthContext);

  // console.log(currentUser)
  const { data } = useContext(ChatContext);

  // console.log(currentUser.uid)

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div
        ref={ref}
        className={`message   object-scale-downn   scroll-smooth overflow-y-auto p-3 flex items-center p-2.5 ${messages.senderId === currentUser.uid ? "justify-end " : "justify-start"} ${messages.senderId === currentUser.uid && "owner"}  `}
      >
        <div
          className={`  w-10 h-10 rounded-full  p-0.5  flex justify-start ${messages.senderId === currentUser.uid ? "hidden" : ""} `}
        >
          <img src={data.user?.photoURL} alt="" />
        </div>
        <div
          className={`messsageInfo rounded-3xl text-xl  p-2.5 pl-4 pr-4 m-2  ${messages.senderId === currentUser.uid ? " bg-blue-500 text-white" : " bg-slate-200"} p-1.5`}
        >
          <p>{messages.text}</p>
        </div>
      </div>
    </>
  );
};

export default Message;
