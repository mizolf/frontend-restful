import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Post from '../components/Post';

const ProfilePage: React.FC = () => {
  const { username, email, joinedAt } = useAuth();
  const [userPosts, setUserPosts] = React.useState<any[]>([]);

  //Potrebno popraviti ovu funkciju tako da se ne poziva prije logina
  const fetchMyPosts = async () => {
    try {
      const res = await fetch("http://localhost:5500/user/my-posts", {
        credentials: 'include',
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error response text:", text);
        throw new Error(`Failed to fetch posts: ${res.status}`);
      }
      
      const data = await res.json();
      setUserPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    
    fetchMyPosts();
  }, []);

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-3xl text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray">My Profile</h2>
        <div className="space-y-4 text-lg flex flex-row justify-between">
          <p><span className="font-semibold">Username:</span> {username}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p><span className="font-semibold">Joined at:</span> {joinedAt}</p>
        </div>
      </div>


      <div className='flex flex-col w-[1200px]  p-7 max-[1199px]:w-full'>
      <h2 className="text-3xl font-bold mb-6 text-left text-gray">My Posts</h2>

      <div className='grid grid-cols-2 gap-7 mt-10 w-full max-md:grid-cols-1 max-md:gap-5'>
        {userPosts.length === 0 ? (
              <p>No posts found</p>
          ) : (
            userPosts.map(post =>(
                  <Post key={post._id} 
                  title={post.title} 
                  body={post.body} 
                  image={post.image?.url} 
                  category={post.category} 
                  author={post.user?.username} 
                  email={post.user?.email}/>
              ))
          )}
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
