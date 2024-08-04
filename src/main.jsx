import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Duo from './Components/Link/Duo.jsx';
import Mega from './Components/Link/Mega.jsx';
import Login from './Components/Link/Login.jsx';
import LinkPage from './Pages/LinkPage.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/:link',
        element: <LinkPage />,
        children: [
          {
            path: '/:link/',
            element: <Duo />
          },
          {
            path: '/:link/mega',
            element: <Mega />
          },
          {
            path: '/:link/login',
            element: <Login />
          },
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
