import React from 'react';
import { auth } from "../../Config/fire";
import { signOut } from "firebase/auth";

function LogOut() {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "/";
      }).catch((error) => {
        // An error happened.
      });
  return (
    <></>
  )
}

export default LogOut;