import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VideoPage() {
  const { videoid } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  useEffect(() => {
    const fetchVideoUrl = async () => {
      // try {
      // const response = await axios.get(`https://videoapp-production-e517.up.railway.app/api/videos/${videoid}`);
      const response = await axios.get(`https://videoappbyvedant.vercel.app/videos/${videoid}`);
      console.log(response.data.videos.videolink);
      setVideoUrl(convertToEmbedUrl(response.data.videos.videolink));
      console.log(videoUrl);
      setWebsiteUrl(response.data.videos.websitelink);
      setGithubUrl(response.data.videos.githublink);
      setYoutubeUrl(response.data.videos.videolink);
      // } catch (error) {
      //   console.error("Error fetching video:", error);
      // }
    };

    fetchVideoUrl();
  }, [videoid]);

  const convertToEmbedUrl = (youtubeUrl) => {
    const match = youtubeUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
    );
    console.log(match);
    return match ? `https://www.youtube.com/embed/${match[1]}` : youtubeUrl;
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 text-white">
      <div className="w-full max-w-3xl text-center mb-5">
        <h2 className="text-2xl font-bold my-4">YouTube Video Player</h2>

        <div className="text-left my-5">

          <h5><span className="text-lg font-bold ">Portfolio Website: </span><a className="text-blue-500" href="https://vedanttathe.netlify.app" target="_blank">https://vedanttathe.netlify.app</a></h5>

          {websiteUrl ? (<h5><span className="text-lg font-bold ">Hosted Website Link: </span><a className="text-blue-500" href={websiteUrl} target="_blank">{websiteUrl}</a></h5>) : (<p></p>)}

          {githubUrl ? (<h5><span className="text-lg font-bold ">Github Link: </span><a className="text-blue-500" href={githubUrl} target="_blank">{githubUrl}</a></h5>) :(<h5></h5>)}

            {youtubeUrl ? (<h5><span className="text-lg font-bold ">Demo Video Link: </span><a className="text-blue-500" href={youtubeUrl} target="_blank">{youtubeUrl}</a></h5>) :    (<h5></h5>)}
        </div>

        {videoUrl ? (
          <iframe
            src={videoUrl}
            title="YouTube Video"
            width="100%"
            height="500px"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-md shadow-lg"
          ></iframe>
        ) : (
          <p className="text-red-500">Loading video...</p>
        )}

      </div>
    </div>
  );
}

export default VideoPage;
