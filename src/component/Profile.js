import React, { useEffect, useState } from 'react'
import img from '../asset/profilepic.jpeg'

export default function Profile(props) {
  let [disabled, setDisabled] = useState(true)



  let {name, mobile, email, country} = props;
 

  let [user, setUser] = useState({name, mobile, email, country })
  useEffect(()=>{
    props.getUser();
    setUser({name,mobile,email,country})
  },[name,mobile,email,country])

  const handleEdit = (e) => {
    let update = document.getElementsByClassName('update-user')[0];
    let save = document.getElementsByClassName('save-btn')[0];
    let cancel = document.getElementsByClassName('cancel-btn')[0];
    update.style.display = 'flex'
    save.style.display = 'block';
    e.target.style.display = 'none'
    cancel.style.display = 'block'
    setDisabled(false)
  }

  const handleCancel = (e) => {
    let update = document.getElementsByClassName('update-user')[0];
    let edit = document.getElementsByClassName('edit-btn')[0];
    let save = document.getElementsByClassName('save-btn')[0];
    let newPassword = document.getElementById('newPassword')
    let cnfPassword = document.getElementById('cnfPassword')
    let password = document.getElementById('password')
    update.style.display = 'none'
    edit.style.display = 'block'
    e.target.style.display = 'none'
    save.style.display = 'none'
    setDisabled(true)
    if (e.target !== save) {
      setUser({ name, mobile, email, country })
    }
    newPassword.value = ''
    cnfPassword.value = ''
    password.value = ''
  }

  const handleSave = async (e) => {

    let cancel = document.getElementsByClassName('cancel-btn')[0];
    cancel.style.display = 'none'
    let newPassword = document.getElementById('newPassword').value
    let cnfPassword = document.getElementById('cnfPassword').value
    let password = document.getElementById('password').value
    if (newPassword.length === 0 || (newPassword !== cnfPassword)) {
      newPassword = null;
    }
    let {name,mobile,country,email} = user;
    let bool = await props.updateUser(name,mobile,country,email,password,newPassword);
    if(!bool){
      let {name,mobile,country,email} =props;
      setUser({name,mobile,email,country})
    }
    handleCancel(e);
  }

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className=' container'>
      <div className="profile">
        <h1>User Profile</h1>
        <div className=" profile-img"><img src={img} alt="Profilepic" /></div>
        <div className="profile-detail profile-name">
          <i className="fa-solid fa-user fa-lg"></i>:
          <input type="text" name='name' onChange={onchange} value={user.name || ''} disabled={disabled} />
        </div>
        <div className="profile-detail profile-mobile">
          <i className="fa-solid fa-phone fa-lg" style={{ color: "#005eff" }}></i>:
          <input type="text" name='mobile' onChange={onchange} value={user.mobile || ''} disabled={disabled} />
        </div>
        <div className="profile-detail profile-email">
          <i className="fa-solid fa-envelope fa-lg" style={{ color: "#d74242" }}></i>:
          <input type="text" value={user.email || ''} disabled />
        </div>
        <div className="profile-detail profile-country">
          <i className="fa-solid fa-globe" style={{ color: "#005eff" }}></i>:
          <input type="text" name='country' onChange={onchange} value={user.country || ''} disabled={disabled} />
        </div>
      </div>

      <div className="profile update-user">
        <div className="profile-detail">
          <span className="pass">Password</span>:
          <input id='password' type="password" name='password' />
        </div>
        <div className="profile-detail">
          <span className="new-password">New Password</span>:
          <input id='newPassword' type="password" name='newPassword' />
        </div>
        <div className="profile-detail">
          <span className="cnf-password">Confirm Password</span>:
          <input id='cnfPassword' type="password" name='cnf-password' />
        </div>
      </div>

      <div className="profile-btn">
        <button className="edit-btn submit" onClick={handleEdit}>Edit</button>
        <button className="save-btn submit" onClick={handleSave}>Save</button>
        <button className="cancel-btn submit" onClick={handleCancel}>Cancel</button>
      </div>

    </div>
  )
}
