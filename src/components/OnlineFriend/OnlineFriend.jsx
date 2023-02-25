import React from 'react'
import './onlineFriend.css'

const onlineFriend = ({user}) => {
  return (
      <li className="listItem">
              <div className="friendImgContainer">
                <img src={"/images/"+user.profilePicture} alt="" className="imgProfileOnline" />
                <span className="onlineIcon"></span>
              </div>
                <span className="username">{user.username}</span>
            </li> 
    )
  
}

export default onlineFriend
