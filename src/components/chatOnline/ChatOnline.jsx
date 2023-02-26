import { useState, useEffect } from "react";
import "./chatOnline.css"
import axios from 'axios'
import { BASE_URL } from '../../services/helper'

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
  const [friends, setFriends]=useState([]);
  const [onlineFriends, setOnlineFriends]=useState([]);


  useEffect(()=>{
    const getFriends =async()=>{
      const res= await axios.get(`${BASE_URL}/users/friends/`+currentId);
      setFriends(res.data);
    }
    getFriends();
  },[currentId]);

  useEffect(()=>{
    setOnlineFriends(friends.filter((friend)=>onlineUsers.includes(friend._id)));
  },[friends, onlineUsers]);

  const handleClick=async(user)=>{
    try{
      const res= await axios.get(`${BASE_URL}/conversations/find/${currentId}/${user._id}`);
      if(res.data !==null){
        setCurrentChat(res.data);
      }else{
        const res= await axios.post(`${BASE_URL}/conversations`, ({
          senderId:user._id,
          receiverId:currentId
        }))
        console.log(res.data)
        const conversation= await axios.get(`${BASE_URL}/conversations/find/${currentId}/${user._id}`);
        setCurrentChat(conversation.data)
      }
      
    }catch(err){
      console.log(err)
    }
    }
    
  return (
    <div className="chatOnline">
      {onlineFriends.map((o)=>(
        <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
        <div className="chatOnlineImgContainer">
        <img className="chatOnlineImg" src={o?.profilePicture ? `${BASE_URL}/images/`+o?.profilePicture : `${BASE_URL}/images/person/noAvatar.png`} alt="" />
        <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o?.username}</span>
      </div>
      ))}
    </div>
      
      
  )
      }

export default ChatOnline
