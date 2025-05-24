import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { username, email, joinedAt } = useAuth();

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
        <div className="space-y-3">
          <p><span className="font-medium">Username:</span> {username}</p>
          <p><span className="font-medium">Email:</span> {email}</p>
          <p><span className="font-medium">Joined at:</span> {joinedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
