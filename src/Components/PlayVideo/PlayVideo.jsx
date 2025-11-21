import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4"; // Assumed filename for the imported video file
import like from "../../assets/like.png"; // Imported image
import dislike from "../../assets/dislike.png"; // Imported image
import share from "../../assets/share.png"; // Imported image
import save from "../../assets/save.png"; // Imported image
import jack from "../../assets/jack.png"; // Used for publisher image
// import user_profile from '../../assets/user_profile.jpg' // Used for comment profile image (inferred)
import { API_KEY } from "../../data";
import moment from "moment";
import { value_converter } from "../../data";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const { videoID } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const fetchChannelData = async () => {
    //fetching channel data
    const ChannelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(ChannelDetails_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));
    //fetching comment data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoID}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };
  const fetchVideoData = async () => {
    //Fetching videos data
    const VideoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${API_KEY}`;
    await fetch(VideoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };
  useEffect(() => {
    fetchVideoData();
  }, [videoID]);
  useEffect(() => {
    fetchChannelData();
  }, [apiData]);
  return (
    <div className="play-video">
      {/* The video element was used initially, before being replaced by an iframe for API video embedding, */}
      <iframe
        src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      {/* Hardcoded video title */}
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        {" "}
        {/* */}
        {/* Hardcoded views and time */}
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16K"}{" "}
          &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr /> {/* */}
      <div className="publisher">
        {" "}
        {/* */}
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          {/* Hardcoded channel name and subscriber count */}
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "1M"}
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-description">
        {" "}
        {/* */}
        {/* Hardcoded description paragraphs */}
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Description Here"}
        </p>
        <hr />
        {/* Hardcoded comment count */}
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 102}
        </h4>
        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src= {item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>1 day ago</span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(item.snippet.topLevelComment.snippet.likeCount)}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
        {/* Hardcoded Comment Template (one copy before duplication)- */}
      </div>
    </div>
  );
};

export default PlayVideo;
