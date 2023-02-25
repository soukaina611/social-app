import React, { useContext, useEffect, useState } from 'react'
import './leftBar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import TurnedInRoundedIcon from '@mui/icons-material/TurnedInRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import CloseFriend from "../closeFriend/CloseFriend";
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LeftBar = () => {
    const {user}=useContext(AuthContext);
    const [users, setUsers]=useState([]);
 useEffect(()=>{
    const getCloseFriends=async()=>{
        try{
            const closeFriends= await axios.get("/users/all");
            console.log(closeFriends.data)
            setUsers(closeFriends.data);
        }catch(err){
            console.log(err)
        }
    }
    getCloseFriends();
 },[])
  return (
    <div className='leftBar'>
      <div className="leftBarWrapper">
        <ul className="leftBarTop">
            <li className="leftBarItem">
                <RssFeedIcon className='iconBar' />
                <span className="iconBarText">Feed</span>
            </li>
            <li className="leftBarItem">
                <ChatIcon className='iconBar' />
                <span className="iconBarText">Chats</span>
            </li>
            <li className="leftBarItem">
                <PlayCircleFilledRoundedIcon className='iconBar' />
                <span className="iconBarText">Videos</span>
            </li>
            <li className="leftBarItem">
                <PeopleRoundedIcon className='iconBar' />
                <span className="iconBarText">Groups</span>
            </li>
            <li className="leftBarItem">
                <TurnedInRoundedIcon className='iconBar' />
                <span className="iconBarText">Bookmarks</span>
            </li>
            <li className="leftBarItem">
                <HelpOutlineRoundedIcon className='iconBar' />
                <span className="iconBarText">Questions</span>
            </li>
            <li className="leftBarItem">
                <WorkOutlineRoundedIcon className='iconBar' />
                <span className="iconBarText">Jobs</span>
            </li>
            <li className="leftBarItem">
                <EventRoundedIcon className='iconBar' />
                <span className="iconBarText">Events</span>
            </li>
            <li className="leftBarItem">
                <RssFeedIcon className='iconBar' />
                <span className="iconBarText">Courses</span>
            </li>
        </ul>
        <button className="btnBar">Show More</button>
        <hr className='hrBar'/>
        <ul className="leftBarBottom">
        {users.map((u) => (
            <>
            <Link style={{textDecoration:"none", color:"black"}} to={"/profile/"+u.username}>
            <CloseFriend key={u.id} user={u} />
            </Link>
            </>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LeftBar
