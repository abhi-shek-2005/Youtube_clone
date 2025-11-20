import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo' 
import Recommended from '../../Components/Recommended/Recommended' 
import { useParams } from 'react-router-dom' 

const Video = () => {
  // We receive the video ID and category ID from the URL parameters defined in the route structure /video/:categoryID/:videoID.
  const { videoID, categoryID } = useParams(); 

  return (
    <div className='play-container'> {/* The main container div uses the class play-container */}
        
        {/* PlayVideo component is mounted, receiving the IDs via props */}
        <PlayVideo videoID={videoID} categoryID={categoryID}/>
        
        {/* Recommended component is mounted, receiving the category ID via props */}
        <Recommended categoryID={categoryID}/>
    </div>
  )
}

export default Video
