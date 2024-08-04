import React from 'react'
import megaLogo from '../../assets/favicon.ico'
import './Mega.css'
import { Link } from 'react-router-dom'

const Mega = () => {
  return (
    <div className=' mega-container-box'>
      <div className="mega-container">
        <h1>Live Video Chat</h1>
        <p className="txt">Login with MegaPersonals and enjoy with
          <span className="extra-txt"> Private Live Video Chat</span> your dating partner.
        </p>
        <Link to="../login"><img src={megaLogo} />Login with MegaPersonals</Link>
      </div>
    </div>
  )
}

export default Mega