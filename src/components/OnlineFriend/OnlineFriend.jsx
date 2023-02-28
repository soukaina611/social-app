import React from 'react'
import './onlineFriend.css'
import { BASE_URL } from '../../services/helper'

const onlineFriend = ({user}) => {
  return (
      <li className="listItem">
              <div className="friendImgContainer">
                <img src={user.profilePicture ? `${BASE_URL}/images/`+user.profilePicture :`${BASE_URL}/images/person/noAvatar.png` } alt="" className="imgProfileOnline" />
                <span className="onlineIcon"></span>
              </div>
                <span className="username">{user.username}</span>
            </li> 
    )
  
}

export default onlineFriend
