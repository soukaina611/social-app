import './register.css'
import { useRef } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {nanoid} from 'nanoid'
import { BASE_URL } from '../../services/helper'

const Register = () => {
  const username=useRef();
  const email=useRef();
  const password=useRef();
  const passwordConfirm=useRef();
  const navigate= useNavigate();

  const handleSubmit= async(e)=>{
    e.preventDefault();
   if(passwordConfirm.current.value !== password.current.value){
      passwordConfirm.current.setCustomValidity("password doesn't match !");
      passwordConfirm.current.reportValidity();
   }else{
    const user = {
      _id:nanoid(24),
      username: username.current.value,
      email:email.current.value,
      password: password.current.value,
    };
    try{
      await axios.post(`${BASE_URL}/auth/register`, user);
      navigate("/login");
    }catch(err){
      console.log(err);
    }
    }
  }
  const handleLogin=()=>{
    navigate('/login');
  }

  return (
    <div className="register">
      <div className="registerWrapper">
      <div className="registerLeft">
        <h1 className='nameApp'>Social App</h1>
        <span className="registerText">Social App helps you connect and share with the people in your life.</span>
      </div>
      <div className="registerRight">
        <form className="registerRightContainer" onSubmit={handleSubmit} noValidate>
        <input type="text" placeholder='Username' className="inputText" ref={username} required/>
        <input type="email" placeholder='Email' className="inputText" ref={email} required/>
        <input type="password" placeholder='Password' className="inputText" ref={password} required/>
        <input type="password" placeholder='Confirm Password' className="inputText" ref={passwordConfirm} required/>
        <button type="submit" className="loginBtn">Sign up</button>
        <button onClick={handleLogin} className="registerBtn">
          Log into Account
          </button>
        </form>
        
      </div>
      </div>
    </div>
  )
}

export default Register
