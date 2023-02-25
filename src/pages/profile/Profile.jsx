import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import Feed from '../../components/feed/Feed'
import LeftBar from '../../components/LeftBar/LeftBar'
import RightBar from '../../components/RightBar/RightBar'
import './profile.css'
import axios from 'axios'
import { useParams } from 'react-router'

const Profile = () => {
  const [user, setUser]=useState({});
  const username= useParams().username;

  useEffect(()=>{
    const fetchUser=async()=>{
      const res= await axios.get(`/users?username=${username}`);
      setUser(res.data);
    }
    fetchUser();
  },[username])

  return (
    <>
      <TopBar/>
      <div className='profile'>
      <LeftBar/>
      <div className="profileRight">
        <div className='profileRightTop'>
          <div className='imgContainer'>
            <img src={user.coverPicture ? "/images/"+user.coverPicture : "/images/post/noCover.jpg"} alt="" className="imgCover" />
            <img src={user.profilePicture ? "/images/"+user.profilePicture : "/images/person/noAvatar.png"} alt="" className="profileImg" />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileDesc">{user.desc}</span>
          </div>
        </div>
          <div className='profileRightBottom'>
            <Feed username={username}/>
            <RightBar user={user}/>
          </div>
      </div>
      </div>
    </>
  )
}

export default Profile
