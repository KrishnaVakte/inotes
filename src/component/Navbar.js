import React from 'react'
import {  Link } from "react-router-dom";

export default function Navbar(props) {
  let {loggedin,setLogin} = props

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Notes</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            {loggedin && <Link to="/profile">Profile</Link>}
          </li>
        </ul>
        <div className="right">
            {loggedin ||
              <button className='userbtn'>
                <Link to='/login'>Login</Link>
            </button>}
            {loggedin ||
              <button className='userbtn'>
                <Link to='/signup'>Sign up</Link>
            </button>}
            
            {loggedin &&
              <button className='userbtn' onClick={()=>{localStorage.removeItem('authtoken'); setLogin(false)}}>
            <Link to='/login'>Logout</Link>
            </button>}
            
        
        </div>
      </nav>
    </div>
  )
}
