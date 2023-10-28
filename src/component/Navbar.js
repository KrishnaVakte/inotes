import React from 'react'
import {  Link } from "react-router-dom";

export default function Navbar(props) {
  let {loggedin,setLogin} = props

  let handleClick = ()=>{
    let nav =document.getElementsByTagName('nav')[0];
    let navbar = document.getElementsByClassName('navbar')[0]
    navbar.style.height = (navbar.style.height==='unset')?'50px':'unset';
    nav.classList.toggle('nav-active')

    let links = document.getElementsByClassName('nav-link')
    Array.from(links).map((link)=>{
      link.onclick = ()=>{
        nav.classList.remove('nav-active')
        navbar.style.height = (navbar.style.height==='unset')?'50px':'unset';
      }
    })

  }

  return (
    <div className='navbar '>
      <div className="burger" onClick={handleClick}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <nav className=''>
        <ul>
          <li className='nav-link'>
            <Link to="/">Notes</Link>
          </li>
          <li className='nav-link'>
            <Link to="/about">About Us</Link>
          </li>
          <li className='nav-link'>
            {loggedin && <Link to="/profile">Profile</Link>}
          </li>
        </ul>
        <div className="right">
            {loggedin ||
              <button className='userbtn nav-link'>
                <Link to='/login'>Login</Link>
            </button>}
            {loggedin ||
              <button className='userbtn nav-link'>
                <Link to='/signup'>Sign up</Link>
            </button>}
            
            {loggedin &&
              <button className='userbtn nav-link' onClick={()=>{localStorage.removeItem('authtoken'); setLogin(false)}}>
            <Link to='/login'>Logout</Link>
            </button>}
            
        
        </div>
      </nav>
    </div>
  )
}
