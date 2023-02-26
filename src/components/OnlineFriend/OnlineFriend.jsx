import React from 'react'
import './onlineFriend.css'
import { BASE_URL } from '../../services/helper'

const onlineFriend = ({user}) => {
  return (
      <li className="listItem">
              <div className="friendImgContainer">
                <img src={`${BASE_URL}/images/`+user.profilePicture} alt="" className="imgProfileOnline" />
                <span className="onlineIcon"></span>
              </div>
                <span className="username">{user.username}</span>
            </li> 
    )
  
}

export default onlineFriend
