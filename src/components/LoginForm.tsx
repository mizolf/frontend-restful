import * as React from "react";

interface LoginFormProps {
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  handleLoginSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps>= ({setUsername, setPassword, handleLoginSubmit}: LoginFormProps) => {
  return (
    <form onSubmit={handleLoginSubmit} className='flex flex-col items-center w-[350px] gap-2 space-y-4'>
      <input 
        type="text" 
        name="username"  
        className='form-info'
        placeholder='Username'
        onChange={(event)=>setUsername(event.target.value)}
        />
      <input 
        type="password" 
        name="password" 
        placeholder='Password'
        onChange={(event)=>setPassword(event.target.value)}
        className='form-info'/>
      <button type="submit" className='w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer'>Login</button>
    </form>
  )
}

export default LoginForm;