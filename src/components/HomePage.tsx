import React from 'react'
import Post from './Post'
import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
 
interface PostType {
    _id: string;
    title: string;
    body: string;
    category: string;
    user?: { 
        username: string,
        email: string
    };
}

interface HomePageProps{
    username: string;
}

const HomePage: React.FC<HomePageProps> = ({username}: HomePageProps) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    useDebounce(() => {
        setDebouncedSearchTerm(searchTerm);
    }, 500, [searchTerm]);

    useEffect(() => {
        fetch("http://localhost:5500/user/posts/")
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

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
            <div className='flex flex-col w-[1200px] items-center p-5 max-[1199px]:w-full '>
                <h1 className='text-gray text-4xl font-bold mb-5'>Welcome, {username}!</h1>

                <input 
                    type="text" 
                    placeholder="Search.." 
                    onChange={handleInputChange} 
                    value={searchTerm}
                    className='search-input'/>


                <div className='flex flex-row w-full gap-7 mt-10 max-md:flex-col max-md:gap-5'>
                    {filteredPosts.length === 0 ? (
                        <p>No posts found</p>
                    ) : (
                        filteredPosts.map(post =>(
                            <Post key={post._id} title={post.title} body={post.body} category={post.category} author={post.user?.username} email={post.user?.email}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage