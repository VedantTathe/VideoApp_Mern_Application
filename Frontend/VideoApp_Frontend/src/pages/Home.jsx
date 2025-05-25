import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaCopy, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [videoName, setVideoName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [githublink, setGithubLink] = useState("");
  const [videoLinks, setVideoLinks] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchVideos = async () => {
      try {

        // const response = await axios.get("https://videoapp-production-e517.up.railway.app/api/videos");
        const response = await axios.get("https://videoappbyvedant.vercel.app/videos");
        setVideoLinks(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const videoData = {
        userid: localStorage.userid,
        videoname: videoName,
        videolink: videoLink,
        websitelink: websiteLink,
        githublink: githublink,
      };

      if (editingVideo) {
        videoData._id = editingVideo._id; 
        // await axios.post("https://videoapp-production-e517.up.railway.app/api/videos", videoData);
        await axios.post("https://videoappbyvedant.vercel.app/videos/update", videoData);
        setEditingVideo(null);
      } else {
        // await axios.post("https://videoapp-production-e517.up.railway.app/api/videos", videoData);
        await axios.post("https://videoappbyvedant.vercel.app/videos/create", videoData);
      }

      setVideoName("");
      setVideoLink("");
      setWebsiteLink("");
      setGithubLink("");
      window.location.reload(); // Refresh to update the list
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`https://videoapp-production-e517.up.railway.app/api/videos/${id}`);
      await axios.delete(`https://videoappbyvedant.vercel.app/videos/delete/${id}`);
      setVideoLinks(videoLinks.videos.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setVideoName(video.videoname);
    setVideoLink(video.videolink);
    setWebsiteLink(video.websitelink);
    setGithubLink(video.githublink);
  };

  const handleCopy = (id) => {
    const videoUrl = `${import.meta.env.VITE_WEBSITE_URL}video/${id}`;
    navigator.clipboard.writeText(videoUrl)
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Failed to copy link:", error));
  };

  const handleView = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black p-6">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Upload Your Video</h2>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-white">
        <input
          type="text"
          placeholder="Enter Video Name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          placeholder="Paste Video link here (Google Drive, Youtube)"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          placeholder="Paste hosted website link here"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Paste Project Github Link Here"
          value={githublink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button type="submit" className="w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
          {editingVideo ? "Update Video" : "Submit Video"}
        </button>
      </form>

      <div className="mt-6 w-full max-w-2xl">
        <h3 className="text-xl font-semibold text-green-400 mb-4">Uploaded Videos</h3>
        {videoLinks.length === 0 ? (
          <p className="text-center text-lg text-gray-400">No videos available</p>
        ) : (
          <ul className="space-y-4">
            {videoLinks.videos.map((video) => (
              <li key={video._id} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center text-white">
                <div>
                  <p className="text-lg font-medium text-gray-100">{video.videoname}</p>
                  <p className="text-sm text-gray-400">{video.videolink}</p>
                  <p className="text-sm text-gray-400">{video.websitelink}</p>
                  <p className="text-sm text-gray-400">{video.githublink}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={() => handleView(video._id)}>
                    <FaEye />
                  </button>
                  <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" onClick={() => handleCopy(video._id)}>
                    <FaCopy />
                  </button>
                  <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition" onClick={() => handleEdit(video)}>
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={() => handleDelete(video._id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
