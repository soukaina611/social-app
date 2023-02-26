import "./conversation.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from '../../services/helper'

const Conversation = ({conversation, currentUser}) => {
const[user,setUser]=useState(null);
  useEffect(()=>{
    const friendId= conversation.members.find((id)=>id!==currentUser._id);
    const getUserFriends=async()=>{
      try{
        const res= await axios.get(`${BASE_URL}/users?userId=`+friendId);
        setUser(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getUserFriends();
  },[])

    return (
    <div className="conversation">
          <img className="imgFriend" src={user?.profilePicture ? `${BASE_URL}/images/`+user?.profilePicture : `${BASE_URL}/images/person/noAvatar.png`} alt="" />
          <span className="friendName">{user?.username}</span>
    </div>
  )
}

export default Conversation
