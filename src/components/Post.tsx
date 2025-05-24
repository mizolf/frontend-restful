import React from 'react'
import KebabMenu from './KebabMenu';

interface PostProps {
    title: string;
    body: string;
    category: string;
    author?: string;
    email?: string;
    image?: string;
}

const Post: React.FC<PostProps> = ({title, body, image, category, author, email}) => {
  return (
    <div className="flex flex-col w-full h-[500px] p-6 shadow-lg rounded-xl bg-white border border-gray-200 overflow-y-auto">
      
      <div className='flex flex-row justify-between align-center mb-4'>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <KebabMenu/>
      </div>
      <p className="text-gray-700 text-md leading-relaxed mb-4">{body}</p>
      <img src={image} alt="" className='w-full h-[60%] object-cover rounded-lg mb-4' />
      <p className={`text-sm font-semibold uppercase tracking-wide mb-2 
        ${category === 'Lost' ? 'text-red-500' : 'text-green-500'}`}>
        {category}
      </p>
      <p className="text-gray-500 text-sm">By: <span className="font-medium text-gray-700">{author}</span></p>
      <p className="text-gray-500 text-sm mt-1">Contact: {email ? (<a href={`mailto:${email}`} className="text-blue-600 font-bold hover:underline">{email}</a>): ("Email not provided")}</p>
    </div>
  )
}

export default Post