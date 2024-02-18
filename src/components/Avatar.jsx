import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { db, storage } from "../App";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const Avatar = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoadng] = useState(false);
  const [Success, setSuccess] = useState(false);
  currentUser && console.log(currentUser.uid);
  currentUser && console.log(currentUser.displayName);
  const date = new Date().getTime();
  const storageRef =
    currentUser && ref(storage, `${currentUser.displayName + date}`);

  const handleSubmit = async (e) => {
    setSuccess(false)
    setLoadng(true);
    e.preventDefault();
    console.log("chala");
    const file = e.target[0].files[0];

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          console.log(downloadURL);
          //Update profile
          await updateProfile(currentUser, {
            photoURL: downloadURL,
          });
          currentUser &&
            (await updateDoc(doc(db, "users", currentUser.uid), {
              photoURL: downloadURL,
            }).then(() => {
              setSuccess(true);
            }));
        } catch (er) {
          setLoadng(false);
          console.log(er);
        }
      });
    });
    setLoadng(false);
  };
  return (
    <div className="flex flex-col justify-center pt-24 my-auto">
      <div className="flex mx-auto">
        <img className="avatr  object-cover h-24 w-24" src={currentUser && currentUser.photoURL} alt="" />
      </div>
      <form
        onSubmit={handleSubmit}
        class="flex pt-4 flex-col items-center justify-center my-auto space-y-4"
        action="/"
      >
        <h2 class="text-2xl font-bold text-blue-600">Update Profile Picture</h2>
        <label
          for="profile-pic"
          class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.5 13.5A1.5 1.5 0 0 1 4 12v-6a1.5 1.5 0 0 1 3 0v6h4a1.5 1.5 0 0 1 1.5 1.5l-1.5 1.5v5a1.5 1.5 0 0 1-3 0v-5zM6 11.5c.41 0 .75-.34 1-.75h2c.25.41.5.75 1 .75h2c.41 0 .75-.34 1-.75v-2c-.25.41-.5.75-1 .75h-2c-.25.41-.5.75-1 .75v2z" />
          </svg>
          <span>Add Image</span>
        </label>

        <input
          type="file"
          style={{ display: "none" }}
          required
          id="profile-pic"
          name="profile-pic"
          class="block w-full bg-gray-200 border border-gray-300 p-2 rounded-md cursor-pointer focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
        >
          Save Changes
        </button>
      </form>

      <h1 className="font-sans outline-1 hover:text-blue-500 outline-black text-xl font-semibold p-2 mt-3 ">
        <Link to={"/private"}>Back to Chats</Link>
      </h1>
      {loading ? (
       <div className="mx-auto mt-5"><RotatingLines
       className="mx-auto "
       visible={true}
       height="96"
       width="96"
       strokeColor="#007FFF"
       strokeWidth="5"
       animationDuration="0.75"
       ariaLabel="rotating-lines-loading"
       wrapperStyle={{}}
       wrapperClass=""
     /></div>
      ) : (
        <></>
      )}
      {Success && (
        <h1 className="font-sans text-green-500  font-semibold text-xl ">
          Profile update succesfull..
        </h1>
      )}
    </div>
  );
};

export default Avatar;
