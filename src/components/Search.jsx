import React, { useState ,useEffect} from 'react'
import { collection, query, where ,doc, getDocs, setDoc} from "firebase/firestore";
import '../index.css'
import {db} from '../App'
const Search = () => {

const [userName,SetuserName]=useState('');
const [err, setErr] = useState(false);
const [user,setUser]=useState(null);
// const userRef = collection(db, "users");


const handleSearch=async() =>{


  const q = query(
    collection(db, "users"),
    where("userName", "==", userName)
  );

  console.log("handleSeartch chal;a")
  console.log(userName)

  try {
    
    const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
   setUser(doc.data());
  });
  } catch (error) {
    setErr(true)
  }
  


  // const q =  query(userRef, where("userName", "==", userName));

}


const handleKey=(e)=>{
  // e.preventDefault()
e.code==="Enter" && handleSearch();
}

const authUser = JSON.parse(localStorage.getItem('user'));
const handleSelect= async()=>{
console.log('handleSelect call')
const combID = authUser.uid>user.uid ?  authUser.uid + user.uid : user.uid + authUser.uid;
console.log(combID)

try {
  const  res = await getDocs(db,"chats",combID);
console.log(res.exists());
  if(!res.exists()){
    await setDoc(doc(db,"chats",combID),{messages:[]})
  }
  
} catch (error) {
  setErr(true)
}
}





  return (
    <>
    {err && <span>error ho  giyo</span>}

    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => SetuserName(e.target.value)}
          value={userName}
          />
  
          </div>


    {user ? (
      <div className="userChat" onClick={handleSelect}>
          <img  className='avatar' src='https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain' alt="img" />
          <div className="userChatInfo">
            <span>{user.userName}</span>
          </div>
        </div>
      ):<span></span>}
       </div>

       
    </>
  )
}

export default Search
