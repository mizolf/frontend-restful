import React from 'react'
import Post from '../components/Post'
import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import PostModal from '../components/PostModal';
import { useAuth } from '../context/AuthContext'

interface PostType {
    _id: string;
    title: string;
    body: string;
    category: string;
    image?: {
        publicId: string;
        url: string;
    };
    user?: { 
        username: string,
        email: string
    };
}

const HomePage: React.FC = () => {
    const { username } = useAuth();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    useDebounce(() => {
        setDebouncedSearchTerm(searchTerm);
    }, 500, [searchTerm]);

    const fetchPosts = () => {
        fetch("http://localhost:5500/user/posts/")
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error("Error fetching posts:", error));
    }

    useEffect(fetchPosts, []);

    useEffect(()=>{
        setFilteredPosts(posts.filter(post=>
            post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            post.body.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        ));
    }, [debouncedSearchTerm, posts]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setSearchTerm(e.target.value);
    }

    return (
        <div className='flex flex-col h-svh items-center'>
            <div className='flex flex-col w-[1200px] items-center p-7 max-[1199px]:w-full '>
                <h1 className='text-gray text-4xl font-bold my-10'>Welcome, {username}!</h1>

                <input 
                    type="text" 
                    placeholder="Search.." 
                    onChange={handleInputChange} 
                    value={searchTerm}
                    className='search-input'/>

                <div className='flex flex-row items-center justify-end w-full mt-10 max-md:flex-row max-md:justify-between'>
                    <p className='mx-5 text-gray'>Lost or found something?</p>
                    <PostModal onPostCreated={fetchPosts}/>
                </div>

                <div className='grid grid-cols-2 gap-7 mt-10 w-full max-md:grid-cols-1 max-md:gap-5'>
                    {filteredPosts.length === 0 ? (
                        <p>No posts found</p>
                    ) : (
                        filteredPosts.map(post =>(
                            <Post key={post._id} 
                            title={post.title} 
                            body={post.body} 
                            image={post.image?.url} 
                            category={post.category} 
                            author={post.user?.username} 
                            email={post.user?.email}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage