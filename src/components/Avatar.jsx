import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { storage } from "../App";

const Avatar = () => {
  const { currentUser } = useContext(AuthContext);
  currentUser && console.log(currentUser.displayName);
  const date = new Date().getTime;
  const storageRef = ref(storage, `${currentUser.displayName + date}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clg")
    const file = e.target[0].value;
console.log(file)

    const upload = await uploadBytesResumable(storageRef, file)
    console.log(upload)
  //   .then(() => {
  //     getDownloadURL(storageRef).then(async (downloadURL) => {
  //       try {
  //         //Update profile
  //         await updateProfile(currentUser.user, {
  //           photoURL: downloadURL,
  //         });
  //       } catch (er) {
  //         console.log(er);
  //       }
  //     });
  //   });
    console.log("handle");
  };
  return (
    <div>
      <h1>Change your Profile Picture (Avatar)</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="img">
          <input type="file" id="img" />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Avatar;
