import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

const App = () => {
  // Initialize state to manage the visibility/toggle of the sidebar.
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      {/* Navbar component is mounted and receives the state setter function to toggle the sidebar. */}
      <Navbar setSidebar={setSidebar} />

      {/* Routes define the paths for navigation. */}
      <Routes>
        {/* The Home page route mounts Home, passing the current sidebar state. */}
        <Route path='/' element={<Home sidebar={sidebar} />} />
        
        {/* The Video page route uses parameters for categoryID and videoID. */}
        <Route path='/video/:categoryID/:videoID' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App
