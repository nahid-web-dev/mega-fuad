import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './LinkPage.css'
import Call from '../Components/Call'
import { LinkInfo } from '../Store/Context'

const LinkPage = () => {

  const { linkName, setLinkName, URL } = useContext(LinkInfo)

  const location = useLocation()

  useEffect(
    () => {
      async function fetchLinkInfo() {
        const path = location && location.pathname.split("/")[1]
        const response = await fetch(`${URL}/link/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            linkName: path
          })
        })
        const result = await response.json()
        if (result.success) {
          setLinkName(path)
        } else {
          return
        }
      }
      fetchLinkInfo()
    }

    , [location]
  )

  return (
    <>
      {linkName && <div className='link-page-container flex justify-center'>
        <div className='link-page-inner-box'>
          <Call />
          <Outlet />
        </div>
      </div>}

    </>
  )
}

export default LinkPage