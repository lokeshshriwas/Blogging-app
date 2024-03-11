import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from '../components/DashProfile'
import DashSidebar from '../components/DashSidebar'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashBoardComp from '../components/DashBoardComp'
import DashBookmarks from '../components/DashBookmarks'

const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState("")

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56 '>
        {/* sidebar */}
        <DashSidebar/>
      </div>
      <div className='w-full overflow-hidden'>
        {/* profile... */}
        {tab === 'profile' && <DashProfile/>}
        {tab === "posts" && <DashPosts/>}
        {tab === 'users' && <DashUsers/>}
        {tab === 'comments' && <DashComments/>}
        {tab === 'dashboard' && <DashBoardComp/>}
        {tab === "bookmarks" && <DashBookmarks/>}
      </div>
    </div>
  )
}

export default Dashboard