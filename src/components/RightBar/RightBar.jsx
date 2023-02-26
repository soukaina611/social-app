import React, { useContext, useEffect, useReducer, useState } from 'react'
import './rightBar.css'
import {Users} from '../../data'
import OnlineFriend from '../OnlineFriend/OnlineFriend'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../../services/helper'

const RightBar = ({user}) => {
  const [friends, setFriends]=useState([]);
  const {user:currentUser, dispatch}=useContext(AuthContext);
  const [followed, setfollowed]= useState(null)
  
useEffect(()=>{
  setfollowed(currentUser?.followings.includes(user?._id));
},[user, currentUser?.followings])

  useEffect(()=>{
  const friendList=async()=>{
    try{
     const res= await axios.get(`${BASE_URL}/users/friends/`+ user._id);
      setFriends(res.data);
    }catch(err){
      console.log(err)
    }
  }
  friendList();
},[user])


const handleClick=async()=>{
  try{
    if(followed){
      await axios.put(`${BASE_URL}/users/`+user._id+"/unfollow", {userId:currentUser._id});
      dispatch({type:"UNFOLLOW",payload:user._id});
    }else{
      await axios.put(`${BASE_URL}/users/`+user._id+"/follow", {userId:currentUser._id});
      dispatch({"type":"FOLLOW",payload : user._id});
    }
    setfollowed(!followed);
  }catch(err){
    console.log(err)
  }
}

  const HomeRightBar=()=>{
    return (
      <>
      <div className="rightBarTop">
        <img src={`${BASE_URL}/images/birthdayImg.png`} alt="" className="birthday" />
          <span className="birthdayText"><b>Pola Foster</b> and <b>3 others friends</b> have a birthday today</span>
      </div>
          <img src={`${BASE_URL}/images/images.jpg`} alt="" className="adsImg" />
          <span className="onlineFriendText">Online Friends</span>  
          <ul className="friendList">
            {Users.map((u)=>(
              <OnlineFriend key={u.id} user={u} />
            ))}
          </ul>
      </>
    )
  };
  const ProfileRightBar=()=>{
    return(
      <>
      {user.username !== currentUser.username && (
        <button className='btnFollow' onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
        </button>
      )}
      <h4 className='userInformation'>User information</h4>
      <div className="infoItem">
        <span className="label">City:</span>
        <span className="labelValue">{user.city}</span>
      </div>
      <div className="infoItem">
        <span className="label">From:</span>
        <span className="labelValue">{user.from}</span>
      </div>
      <div className="infoItem">
        <span className="label">Relationship:</span>
        <span className="labelValue">{user.relationship===1 ? "Single" : user.relationship===2 ? "Married" : "-"}</span>
      </div>
      <h4 className='userFriends'>My friends</h4>
      <div className="friendListItem">
        {friends.map(friend =>(
          <Link style={{textDecoration:"none"}}to={"/profile/"+friend.username}>
          <div className="friendItem">
          <img src={friend.profilePicture ? `${BASE_URL}/images/`+friend.profilePicture : `${BASE_URL}/images/person/noAvatar.png`} alt="" className="friendPicture" />
          <span className="friendName">{friend.username}</span>
          </div>
          </Link>
          
        ))}
      </div>
      </>
    )
  }
  return (
    <div className='rightBar'>
      <div className="rightBarWrapper">
        {user ? <ProfileRightBar/> : <HomeRightBar/>}
      </div>
    </div>
  )
}

export default RightBar
