import React from "react";
import SendMessage from "./SendMessage";
import MessangerConsole from "./MessangerConsole";

function UserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <MessangerConsole />
    </div>
  );
}

export default UserProfile;
