import React, { useContext, useRef, useState } from 'react'
import './share.css'
import CollectionsIcon from '@mui/icons-material/Collections';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from "@mui/icons-material/Cancel"
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../../services/helper'


const Share = () => {
  const {user} = useContext(AuthContext);
  const desc= useRef();
  const [file, setFile]=useState(null);

  const handlePost = async(e)=>{
    e.preventDefault();
    const post={
      userId : user._id,
      desc:desc.current.value,
    }
      if(file){
        const data= new FormData();
        const fileName= Date.now() + file.name;
        data.append('name', fileName);
        data.append('file', file);
        post.img=fileName;
        try{
          const res=await axios.post(`${BASE_URL}/upload`,data);
          console.log(res)
          window.location.reload();
        }catch(err){
          console.log(err)
        }
      }
    try{
      await axios.post(`${BASE_URL}/posts`,post);
    }catch(err){
      console.log(err)
    }
}
  return (
    <div className='share'> 
      <form className='shareWrapper' onSubmit={handlePost}>
        <div className='shareHeaderTop'>
          <img src={user.profilePicture ? `${BASE_URL}/images/`+user.profilePicture : `${BASE_URL}/images/person/noAvatar.png`} alt="" className="imagePicture" />
          <input placeholder={`What's in your mind ${user.username} ?`} className="shareInputText" ref={desc} />
        </div>
        <hr className='hr'/>
        {file &&(
          <div className="imgFileContainer">
            <img src={URL.createObjectURL(file)} alt="" className="imgFile" />
            <CancelIcon className='cancelFile' onClick={()=>setFile(null)}/>
          </div>
        )}
        <div className="shareHeaderBottom">
          <div className="shareBottomRight">
              <label htmlFor='file' className="shareBottomItem">
                <CollectionsIcon htmlColor='tomato' className='iconItem'/>
                <span className="iconText">Photo or video</span>
                <input style={{display:"none"}} name='file' type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])} />
              </label>
              <div className="shareBottomItem">
                <LabelIcon htmlColor='blue' className='iconItem'/>
                <span className="iconText">Tag</span>
              </div>
              <div className="shareBottomItem">
                <LocationOnIcon htmlColor='green' className='iconItem'/>
                <span className="iconText">Location</span>
              </div>
              <div className="shareBottomItem">
                <EmojiEmotionsIcon htmlColor='goldenrod' className='iconItem'/>
                <span className="iconText">Feelings</span>
              </div>

          </div>
          <div className="shareBottomLeft">
            <button className='shareBtn'>Share</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Share

