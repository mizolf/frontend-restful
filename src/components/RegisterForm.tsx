import * as React from 'react'

interface RegisterFormProps{
      setUsername: (username: string) => void;
      setPassword: (password: string) => void;
      setEmail: (email: string) => void;
      handleRegisterSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({setUsername, setPassword, setEmail, handleRegisterSubmit}: RegisterFormProps) => {
  return (
    <form onSubmit={handleRegisterSubmit} className='flex flex-col items-center w-[350px] gap-2 space-y-4'>
        <input 
            type="email" 
            name="email"  
            className='form-info' 
            placeholder='Email'
            onChange={(event)=>setEmail(event.target.value)}
            />
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
          <button type="submit" className='w-full primary-button'>Register</button>
        </form>
  )
}

export default RegisterForm