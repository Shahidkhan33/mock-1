import React from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const handleregister = async()=>{
        console.log('register')
        fetch('https://fsd-project-backend-5.onrender.com/users/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username:document.getElementById('username').value,
                email:document.getElementById('email').value,
                password:document.getElementById('password').value
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            navigate("/todolistmain/"+data._id)
        }
        )

        
    }
    return (
        <div id="app" className="min-w-[400px] w-1/2 mx-auto mt-16">
      <div className="max-w-4xl bg-violet-500 p-4 rounded-lg shadow-lg ">
        <div class="w-full max-w-xs mx-auto mt-8">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        email
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"  onClick={handleregister}>
                        Register
                    </button>
                    
                    
                    
                </div>
                <p className='text-xs mt-4'>Already have an Account? <a href='/login'>Go to Login Page</a></p>
            </form>
            <p class="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div></div></div>
    )
}

export default Register