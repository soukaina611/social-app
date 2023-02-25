import React from 'react'
import './home.css'
import TopBar from '../../components/TopBar'
import Feed from '../../components/feed/Feed'
import LeftBar from '../../components/LeftBar/LeftBar'
import RightBar from '../../components/RightBar/RightBar'

const Home = () => {
  return (
    <>
      <TopBar/>
      <div className='homeContainer'>
      <LeftBar/>
      <Feed/>
      <RightBar/>
      </div>
    </>
  )
}

export default Home
