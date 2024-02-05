import React from 'react'
import SendMessage from './SendMessage';
import MessangerConsole from './MessangerConsole';

function UserProfile() {

  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      {/* <h1>Hello!! {user && user.email}</h1> */}
      
      {/* <SendMessage/> */}
      <MessangerConsole/>
    </div>
  )
}

export default UserProfile
