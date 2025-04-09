import React from 'react';
import myImage from '../assets/dice.jpeg';
import logo from '../assets/dice_logo.png';

function Login(){
    return(
        <div className='flex min-h-screen'>
            <div className="w-1/2">
                <img 
                    src={myImage} 
                    alt="lab image"  
                    className="w-full h-full object-cover"
                />
            </div>
            <div className='w-1/2 flex flex-col justify-center items-center px-10'>
                <img src={logo} alt="logo" className='pl-8 h-1/5 justify-center' />
                <div className='w-full max-w-md'>
                    
                    <div className='mb-8 text-2xl font-semibold text-center'>
                        Sign in to your account
                    </div>
                    <form action="" className='space-y-4'>
                        <input type="email" placeholder='Email address' className='w-full p-2 border rounded-md'/>
                        <input type="password" placeholder='Password' className='w-full p-2 border rounded-md'/>

                        <div className='flex justify-between items-center test-sm'>
                            <label className='flex item-center'>
                                <input type="checkbox" className='mr-1'/> Remember me
                            </label>
                            <a href="" className='text-indigo-600 cursor-pointer'>Forget password?</a>
                        </div>
                        
                        <button className='w-full bg-indigo-600 font-semibold text-white py-2 rounded-md'>Sign in</button>
                    </form>

                    <div className='flex items-center my-4'>
                        <hr className='flex-grow border-b border-gray-300'/>
                        <span className='mx-4 text-gray-500'>Or continue with</span>
                        <hr className='flex-grow border-b border-gray-300'/>
                    </div>
                    <div className='flex justify-center mt-4 gap-4'>
                        <button className='flex flex-grow justify-center font-semibold items-center border px-4 py-2 rounded-md'>
                        <img src="https://img.icons8.com/color/16/google-logo.png" alt="google" className="mr-2" />
                        Google
                        </button>
                        <button className="flex flex-grow justify-center font-semibold items-center border px-4 py-2 rounded-md">
                        <img src="https://img.icons8.com/ios-glyphs/16/github.png" alt="github" className="mr-2" />
                        GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;