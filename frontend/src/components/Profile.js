import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { user, getUserInfo, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(user);

      getUserInfo(user._id) // get the users info
        .then((data) => {
          if (data) {
            setProfileData(data); // set the info from the api to profileData so we can display it
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [user, getUserInfo]);

  //decode the profile picture's binary data so we can display it
  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h2>User Profile</h2>
        {profileData && (
          <div>
            {profileData.profilePic && (
              <img
                className="profile-picture"
                src={`data:${
                  profileData.profilePic.contentType
                };base64,${arrayBufferToBase64(
                  profileData.profilePic.data.data
                )}`}
                alt="Profile"
              />
            )}
            <p className="username">{profileData.username}</p>
            <h3 className="past-quizzes">Past Quizzes</h3>
            {profileData.quizzes && profileData.quizzes.length > 0 ? (
              <ul>
                {profileData.quizzes.map((quiz, index) => (
                  <li key={index} className="quiz-item">
                    Quiz ID: {quiz.quizId}, Score: {quiz.score}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No past quizzes available.</p>
            )}
          </div>
        )}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
