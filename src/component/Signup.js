import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Signup(props) {
  const navigate = useNavigate();

  const onsubmit = (e) => {
    let name = document.getElementById('signup-name').value
    let country = document.getElementById('signup-country').value
    let email = document.getElementById('signup-email').value
    let mobile = document.getElementById('signup-mobile').value
    let password = document.getElementById('signup-password').value
    let cnfPassword = document.getElementById('signup-cnfPassword').value
    e.preventDefault();
    if (cnfPassword === password) {
      props.createUser(name, email, mobile, country, password)
      props.setLogin(localStorage.getItem('authtoken')!=='undefined' && localStorage.getItem('authtoken')? true:false)
    }
    else {
      props.setAlrt(['danger','ERROR : Invalid details...'])
    }


  }

  useEffect(() => {
    if (props.loggedin) {
      navigate("/")
    }
  }, [props.loggedin])


  return (
    <div className='container login'>
      <div className="signup-box login-box">
        <h1><i className="fa-solid fa-user fa-xl" style={{ color: "#005eff" }}></i>  Sign Up </h1>
        <form className='signup-form' onSubmit={onsubmit}>
          <div className="login-details">
            <div className="login-field"><span>Name  </span>: <input id="signup-name" type="text" placeholder='Enter name' minLength={3} required /> </div>
            <div className="login-field"><span>Country  </span>: <input id="signup-country" type="text" placeholder='Enter country' required minLength={2} /> </div>
            <div className="login-field"><span>Email  </span>: <input id="signup-email" type="email" placeholder='Enter Email' required /> </div>
            <div className="login-field"><span>Mobile  </span>: <input id="signup-mobile" type="phone" placeholder='Enter Mobile number' minLength={10} required /> </div>
            <div className="login-field"><span>Password  </span>: <input id="signup-password" type="password" placeholder='Enter Password' minLength={3} required /> </div>
            <div className="login-field"><span>Confirm Password  </span>: <input id="signup-cnfPassword" type="password" placeholder='Enter confirm Password' minLength={3} required /> </div>
            <button className="submit" type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
