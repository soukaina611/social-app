import './topBar.css'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AuthContext } from './context/AuthContext';
import { BASE_URL } from '../services/helper'


const TopBar = () => {
  const {user}= useContext(AuthContext);
  
  return (
    <div className='topBarContainer'>
      <div className="topBarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">Social App</span>
        </Link>
      </div>
      <div className="topBarCenter">
        <SearchIcon className='searchIcon'/>
        <input type="text" className="searchInput" placeholder='Search for person, post or video'/>
      </div>
      <div className="topBarRight">
        <div className='topBarLinks'>
          <Link style={{textDecoration:"none",color:"white"}}to="/">
          <span className='topBarLink'>Homepage</span>
          </Link>
        </div>
        <div className="topBarIcons">
            <div className="topBarItem">
            <PersonIcon className='icons'/>
            <span className='textIcon'>1</span>
            </div>
            <div className="topBarItem">
            <Link style={{color:"white", textDecoration:"none"}} to="/messenger">
            <ChatIcon className='icons'/>
            <span className='textIcon'>2</span>
            </Link>
            </div>
            <div className="topBarItem">
            <NotificationsIcon className='icons'/>
            <span className='textIcon'>1</span>
            </div>
        </div>
        <div className="imageItem">
          <Link to={`/profile/${user.username}`}>
          <img className="imageProfile" src={user.profilePicture ? `${BASE_URL}/images/`+user.profilePicture : `${BASE_URL}/images/person/noAvatar.png`} alt="" />
          </Link>
        </div>
      </div>
      </div>
  )
}

export default TopBar
