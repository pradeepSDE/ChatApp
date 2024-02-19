import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { db, storage } from "../App";
import { Bars } from "react-loader-spinner";

import "firebase/auth";

function SignUp() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then(async (res) => {
        const user = res.user;

        await updateProfile(user, {
          displayName: displayName,
          photoURL:
            "https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain",
        });

        await setDoc(doc(db, "users", user.uid), {
          displayName,
          email,
          password,
          uid: user.uid,
        });

        await setDoc(doc(db, "userChats", user.uid), {});
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        seterror(true);
      });
    alert("login using your Id And password");
    navigate("/SignIn");
  };

  if (Loading) {
    return (
      <div>
        <div className="flex items-center justify-center">
          <h1 className="font-mono text-3xl mt-1.5 font-bold ">
            Creating your acount...
          </h1>
        </div>
        <div className="h-screen flex items-center justify-center">
          <Bars
            height="150"
            width="150"
            color="#00BFFF"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <body className="bg-white rounded-lg ">
          <section class="bg-gray-50 ">
            <div class=" flex  flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                <div class="p-6 border-1 border-blue-300 shadow-xl shadow-blue-400 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Create New account
                  </h1>
                  {error && (
                    <div className="bg-red-200 p-2 rounded-2xl  ">
                      <p className=" text-sm font-semibold px-6 py-2 text-grey-700">
                        Some error occurred...{" "}
                      </p>
                    </div>
                  )}
                  <form
                    class="space-y-4 md:space-y-6"
                    action="#"
                    onSubmit={handleSignup}
                  >
                    <div>
                      <label
                        for="displayName"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Username
                      </label>
                      <input
                        type="Username"
                        name="Username"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setdisplayName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required=""
                      />
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                            required=""
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="remember" class="text-gray-500 ">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        class="text-sm font-medium text-primary-600 hover:underline "
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Sign Up
                    </button>
                    <p class="text-sm font-light text-gray-500 ">
                      Already have an account?{" "}
                      <Link
                        to={"/SignIn"}
                        className="font-bold text-grey-700 underline"
                      >
                        {" "}
                        SignIn{" "}
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </body>
      </>
    );
  }
}

export default SignUp;
