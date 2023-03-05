import {React, useContext, useEffect, useState, useRef} from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RecommendRoundedIcon from '@mui/icons-material/RecommendRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../../services/helper'
import Modal from '../modal/Modal';

const Post = ({post}) => {
  const {user:currentUser}=useContext(AuthContext)
  const [like, setLike]=useState(post.likes.length)
  const [isLiked, setIsLiked]=useState(false)
  const [user, setUser]=useState({});
  const [comments, setComments]=useState([])
  const [openComments, setOpenComments]=useState(false)
  const [infoUsersComment, setInfoUsersComment]=useState([]);
  const [openModal, setOpenModal]=useState(false)
  const [updateText, setUpdateText]=useState(false)
  const[number,setNumber]=useState(-1)
  const [inputText,setInputText]=useState("")
  const icon=useRef();
  const text=useRef();


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

  useEffect(()=>{
    const getInfoComment=async()=>{
      try{
      const usersInfo= await axios.get(`${BASE_URL}/posts/comments/info/`+post._id);
      setInfoUsersComment(usersInfo.data.map((key)=>{
        return key.map((element)=>{
          return {"username": element.username, "profilePicture" : element.profilePicture, "_id":element._id}
        })}))
      }catch(err){
        console.log(err)
      }
    }
    getInfoComment();
  },[])

    useEffect(()=>{
      const handleComments=async()=>{
        try{
          const comments= await axios.get(`${BASE_URL}/posts/comments/`+post._id);
          if(comments){
          setComments(comments.data);
          setOpenComments(!openComments);
          }
        }catch(err){
          console.log(err)
        }
      }
      handleComments();
    },[])
    
  const addComment=(event)=>{
    //KeyBoardEvent keyCode=13(Enter)
    if(event.keyCode===13){
      const addcomment=async()=>{
        const comment ={
            sender: currentUser._id, 
            text: text.current.value
        }
        try{
          await axios.post(`${BASE_URL}/posts/addComment/`+post._id, comment)
          window.location.reload();
        }catch(err){
          console.log(err)
        }
      }
      addcomment();
    }
  }
  const handleModel=(element,index)=>{
    if(element[index]._id===currentUser._id){
      setNumber(index);
      setOpenModal(!openModal);
    }
    /*else{
      icon.current.style.cursor="not-allowed"
    }*/
  }
  const updateComment=async(e)=>{
    if(e.keyCode===13){
      try{
        await axios.put(`${BASE_URL}/posts/updateComment/`+post._id+"/"+updateText+"/"+currentUser._id, {text: inputText});
        window.location.reload();
      }catch(err){
        console.log(err)
      }
    }
    
  }

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className="postWrapperTop">
          <div className="postItem">
            <Link to={`/profile/`+user.username}>
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
            <button onClick={()=>setOpenComments(!openComments)} id="comments" className="postComments">{post.comments.length} comments</button>
          </div>
          
        </div>
        { openComments &&
          <div className="comments">
              {comments.map((comment, index)=>infoUsersComment.map((element)=>(
                <div key={index} className="commentsItem">
                <img className="imgProfileComment" src={element[index].profilePicture ? `${BASE_URL}/images/`+element[index].profilePicture : `${BASE_URL}/images/person/noAvatar.png`} />
                  <div className="commentText">
                  <span className="username">{element[index].username}</span>
                  {updateText===index ? <input type="text" className='textInput' placeholder={comment.text} onChange={(e)=>setInputText(e.target.value)} onKeyUp={(e)=>updateComment(e)}  />
                    :<span className="text">{comment.text}</span>}
                  </div>
                  <MoreHorizIcon ref={icon} className='iconAction' onClick={()=>handleModel(element,index)}/>
                  {openModal && number===index && <Modal updateText={setUpdateText} index={index} text={comment} post={post} id={comment._id} closeModal={setOpenModal}/>}
                </div>
              ))
              )}
                <div className='newComment'>
                  <img className="imgProfileComment" src={user.profilePicture ? `${BASE_URL}/images/`+user.profilePicture : `${BASE_URL}/images/person/noAvatar.png`}/>
                  <input type="text" onKeyUp={addComment} ref={text} placeholder='Écrivez un commentaire...'/>
                </div>
            </div>
        }
      </div>
    </div>
  )
}

export default Post
