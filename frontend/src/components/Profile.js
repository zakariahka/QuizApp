import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { user, getUserInfo } = useAuth();

  useEffect(() => {
    console.log('one')
    console.log(user)
    if (user) {
        console.log('two')
      getUserInfo(user._id).then(data => {
        if (data) {
          setProfileData(data);
        }
      }).catch(error => {
        console.error("Error fetching profile data:", error);
      });
    }
  }, [user, getUserInfo]);

  return (
    <div>
      <h2>User Profile</h2>
      {profileData && (
        <div>
          <img src={profileData.imageUrl} alt="Profile" />
          <p>Username: {profileData.username}</p>
          <h3>Past Quizzes</h3>
          {profileData.quizzes && profileData.quizzes.length > 0 ? (
            <ul>
              {profileData.quizzes.map((quiz, index) => (
                <li key={index}>
                  Quiz ID: {quiz.quizId}, Score: {quiz.score}
                </li>
              ))}
            </ul>
          ) : (
            <p>No past quizzes available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
