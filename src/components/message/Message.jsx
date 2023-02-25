import { useState, useEffect, useContext } from "react";
import "./message.css"
import {format} from "timeago.js"
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Message = ({message,own}) => {
  const {user}= useContext(AuthContext)
  const [profilePicture, setProfilePicture]=useState('');

  useEffect(()=>{
    const getProfilePicture=async()=>{
      try{
      const res= await axios.get("/users/?userId="+message.sender);
        setProfilePicture(res.data.profilePicture);
    
      }catch(err){
        console.log(err)
      }
    }
    getProfilePicture();
  },[user._id])
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img src={profilePicture ? "/images/"+profilePicture : "/images/person/noAvatar.png"} className='messageImg'/>
          <span className='messageText'>{message.text}</span>
        </div>
      <div className="messageBottom">
        <span className="messageDate">{format(message.createdAt)}</span>
      </div>
    </div>
  )
}

export default Message
