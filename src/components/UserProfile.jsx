import React from 'react'

function UserProfile() {

  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h1>Hello!! {user && user.email}</h1>
      from userprofile
      this user is authenticated and messages will appear here
    </div>
  )
}

export default UserProfile
