import "./conversation.css"
import { useEffect, useState } from "react";
import axios from "axios";

const Conversation = ({conversation, currentUser}) => {
const[user,setUser]=useState(null);
  useEffect(()=>{
    const friendId= conversation.members.find((id)=>id!==currentUser._id);
    const getUserFriends=async()=>{
      try{
        const res= await axios.get("/users?userId="+friendId);
        setUser(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getUserFriends();
  },[])

    return (
    <div className="conversation">
          <img className="imgFriend" src={user?.profilePicture ? "/images/"+user?.profilePicture : "/images/person/noAvatar.png"} alt="" />
          <span className="friendName">{user?.username}</span>
    
    </div>
  )
}

export default Conversation
