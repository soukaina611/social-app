 import { useRef, useContext} from 'react'
import './login.css'
import { loginCall } from '../apiCalls';
import { AuthContext } from '../../components/context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const email= useRef();
  const password=useRef();
  const {user,isFetching, error, dispatch}=useContext(AuthContext);
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    loginCall({email:email.current.value, password:password.current.value}, dispatch);
  };
  //console.log(user);


  return (
    <div className="login">
      <div className="loginWrapper">
      <div className="loginLeft">
        <h1 className='nameApp'>Social App</h1>
        <span className="loginText">Social App helps you connect and share with the people in your life.</span>
      </div>
      <div className="loginRight">
        <form className="loginRightContainer" onSubmit={handleSubmit}>
        <input 
        type="email"
         placeholder='Email' 
         className="inputText" 
         ref={email}
         required />
        <input 
        type="password" 
        placeholder='Password' 
        className="inputText"  
        ref={password} 
        required
        minLength="6"
        />
        <button type="submit"className="loginBtn">{isFetching ? "Loading" : "Log In"}</button>
        <span className="forgotPassword">Forgotten password ?</span>
        <hr/>
        <Link to="/register">
        <button className="registerBtn">Create new account</button>
        </Link>
        </form>
        
      </div>
      </div>
    </div>
  )
}

export default Login
