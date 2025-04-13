import React, {useState} from 'react';
import myImage from '../assets/dice.jpeg';
import logo from '../assets/dice_logo.png';
import axios from 'axios';

function Login(){
    const [form, setForm] = useState({ name: '', email: '', password: ''});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            console.log('Submitting to:',`${import.meta.env.VITE_API}/auth/register`);
            console.log('Form:', form);
            const res = await axios.post(`${import.meta.env.VITE_API}/auth/register`, form);
            localStorage.setItem('token', res.data.token);
            alert('Signup successful');

        } catch(err) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    }

    

    return(
        <div className='flex min-h-screen'>
            <div className="w-1/2">
                <img 
                    src={myImage} 
                    alt="lab imagen in to your account"  
                    className="w-full h-full object-cover"
                />
            </div>
            <div className='w-1/2 flex flex-col justify-center items-center px-10'>
                <img src={logo} alt="logo" className='pl-8 h-1/5 justify-center' />
                <div className='w-full max-w-md'>
                    
                    <div className='mb-8 text-2xl font-semibold text-center'>
                        Signup
                    </div>
                    <form action="" onSubmit={handleSubmit} className='space-y-4'>
                        <input type="name" placeholder='Name' className='w-full p-2 border rounded-md' 
                        value={form.name} name='name' onChange={handleChange}/>
                        <input type="email" placeholder='Email address' className='w-full p-2 border rounded-md'
                        value={form.email} name='email' onChange={handleChange} />
                        <input type="password" placeholder='Password' className='w-full p-2 border rounded-md'
                        value={form.password} name='password' onChange={handleChange} />

                        <div className='flex justify-between items-center test-sm'>
                            <label className='flex item-center'>
                                <input type="checkbox" className='mr-1'/> Remember me
                            </label>
                            <a href="" className='text-indigo-600 cursor-pointer'>Forget password?</a>
                        </div>
                        
                        <button className='w-full bg-indigo-600 font-semibold text-white py-2 rounded-md'
                        type='submit'>Sign in</button>
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