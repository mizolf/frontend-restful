import React, { useEffect, useState } from 'react';

interface UserProfile {
  username: string;
  email: string;
  joinedAt: string;
  postsCount: number;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5500/user/profile', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch profile");

        setUser(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  }

  if (!user) {
    return <div className="text-gray-600 text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
        <div className="space-y-3">
          <p><span className="font-medium">Username:</span> {user.username}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Member since:</span> {new Date(user.joinedAt).toLocaleDateString()}</p>
          <p><span className="font-medium">Total Posts:</span> {user.postsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
