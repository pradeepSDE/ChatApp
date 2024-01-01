// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { db } from "../App"
// import { auth } from "../App";

// const Chats = () => {
//   const [chats, setChats] = useState([]);
  
//   //   const { dispatch } = useContext(ChatContext);
  
//   const authUser = JSON.parse(localStorage.getItem('user'));
//   useEffect(() => {
//     const getChats = () => {
//       const unsub = onSnapshot(doc(db, "userChats", authUser.uid), (doc) => {
//         setChats(doc.data());
//       });

//       return () => {
//         unsub();
//       };
//     };

//     authUser.uid && getChats();
//   }, [authUser.uid]);

//   const handleSelect = (u) => {
//     console.log("object")
//     // dispatch({ type: "CHANGE_USER", payload: u });
//   };

//   return (
//     <div className="chats">
//       {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
//         <div
//           className="userChat"
//           key={chat[0]}
//           onClick={() => handleSelect(chat[1].userInfo)}
//         >
//           {/* <img src={chat[1].userInfo.photoURL} alt="" /> */}
//           <div className="userChatInfo">
//             <span>{chat[1].userInfo.displayName}</span>
//             <p>{chat[1].lastMessage?.text}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Chats;