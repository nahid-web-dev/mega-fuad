import React from 'react'
import megaLogo from '../assets/favicon.ico'
import './Mega.css'
import { Link, useParams } from 'react-router-dom'

const Mega = () => {
  const { username } = useParams()
  return (
    <div className=' mega-container-box'>
      <div className=" z-20 mega-container">
        <h1>Live Video Chat</h1>
        <p className="txt">Login with MegaPersonals and enjoy with
          <span className="extra-txt"> Private Live Video Chat</span> your dating partner.
        </p>
        <Link to={`/${username}/login`}><img src={megaLogo} />Login with MegaPersonals</Link>
      </div>
    </div>
  )
}

export default Mega