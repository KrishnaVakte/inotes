import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
  const navigate = useNavigate();

  const onsubmit = async ()=>{
    let username = document.getElementById('login-username').value
    let password = document.getElementById('login-password').value 
    await props.loginUser(username,password)
    
  }
  
    useEffect(()=>{
      if(props.loggedin){
      navigate("/")
      }
    },[props.loggedin])


  
  return (
    <div className='container login'>
      <div className="login-box">
        <h1><i className="fa-solid fa-user fa-2xl" style={{color: "#005eff"}}></i> Login </h1>
        <div className="login-details">
          <div className="login-field"><span>Username  </span>: <input id="login-username" type="email" placeholder='Enter Email' /> </div>
          <div className="login-field"><span>Password  </span>: <input id="login-password" type="password" placeholder='Enter Password' /> </div>
          <button className="submit" onClick={onsubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}
