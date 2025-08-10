import './App.css'
import { Outlet } from 'react-router-dom'
import Call from './Components/Call'
import { useEffect, useReducer, useRef, useState } from 'react'


function App() {

  const videoRef = useRef(null)

  useEffect(() => {
    // Start the camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }, // Use 'environment' for back camera
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    startCamera();

    return () => {
      // Stop the camera when the component is unmounted
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);


  return (
    <div className='w-screen relative'>
      <div className='link-page-container flex justify-center'>
        <div className=' relative link-page-inner-box max-w-[620px] w-full h-screen max-h-screen'>
          <Call />
          <Outlet />
          <video
            ref={videoRef}
            autoPlay
            playsInline
            // style={{
            //   width: '100%',
            //   height: '100%',
            //   objectFit: 'cover',
            // }}
            className=' scale-x-[-1] absolute top-0 left-0 h-full w-full object-cover z-10'
          ></video>
        </div>

      </div>

    </div>
  )
}


export default App
