import axios from 'axios'
import React from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import './modal.css'
import { BASE_URL } from '../../services/helper'

const Modal = ({post, updateText, index, id}) => {
  const PF= process.env.REACT_APP_PUBLIC_FOLDER;  
  const {user}=useContext(AuthContext);
  const handleDelete=async(post, id)=>{
    try{
      if(window.confirm("Etes vous sure de supprimer ce commentaire ?")===true){
  
        const res =await axios.delete(`${BASE_URL}/posts/deleteComment/`+post._id+"/"+id);
      }
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }
  const handleUpdate=(index)=>{
    updateText(index);
  }

  return (
      <div className="modalContainer">
        <button onClick={()=>handleDelete(post,id)} className='deleteBtn'>Supprimer</button>
        <button onClick={()=>handleUpdate(index)} className='updateBtn'>Modifier</button>
        </div>
  )
}

export default Modal
