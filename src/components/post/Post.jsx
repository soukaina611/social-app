import {React, useContext, useEffect, useState} from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RecommendRoundedIcon from '@mui/icons-material/RecommendRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../../services/helper'


const Post = ({post}) => {
  const {user:currentUser}=useContext(AuthContext)
  const [like, setLike]=useState(post.likes.length)
  const [isLiked, setIsLiked]=useState(false)
  const [user, setUser]=useState({});

  const handleClick=async()=>{
      try{
        await axios.put(`${BASE_URL}/posts/"+post._id+"/like`, {userId:currentUser._id})
        
      }catch(err){
        console.log(err)
      }
      setLike(isLiked ? like-1 :like+1)
      setIsLiked(!isLiked)
    }
  
 useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id));
  },[currentUser._id, post.likes])

  useEffect(()=>{
    const fetchUser=async()=>{
    const res= await axios.get(`${BASE_URL}/users?userId=${post.userId}`);
    setUser(res.data);
    }
    fetchUser();
  },[post.userId])

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className="postWrapperTop">
          <div className="postItem">
            <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture ? `${BASE_URL}/images/`+user.profilePicture : `${BASE_URL}/images/person/noAvatar.png`} alt="" className="imgProfilePost" />
            </Link>
          <span className="userName">{user.username}</span>
          <span className="date">{format(post.createdAt)}</span>
          </div>
          <MoreVertIcon className='postIcon' />
        </div>
        <div className="postText">
          <span className="text">{post.desc}</span>
        </div>
        <div className="postWrapperCenter">
          <img src={`${BASE_URL}/images/`+post.img} alt="" className="postPicture" />
        </div>
        <div className="postWrapperBottom">
          <div className="postBottomLeft">
          <RecommendRoundedIcon htmlColor='#1877f2' className='iconLike' role="button" onClick={()=>handleClick()}/>
          <FavoriteIcon htmlColor='red' className='iconLike' role="button" onClick={()=>handleClick()}/>
          <span className="counter">{like}</span>
          </div>
          <div className="postBottomRight">
            <div className="postComments">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
