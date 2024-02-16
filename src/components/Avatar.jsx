import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { storage } from "../App";

const Avatar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.displayName);
  const date = new Date().getTime;
  const storageRef = ref(storage, `${currentUser.displayName + date}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].value;

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //Update profile
          await updateProfile(currentUser.user, {
            photoURL: downloadURL,
          });
        } catch (er) {
          console.log(er);
        }
      });
    });
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
