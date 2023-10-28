
import './App.css';
import './responsive.css'
import React, { useState } from 'react';
import Navbar from './component/Navbar';
import Profile from './component/Profile';
import Login from './component/Login';
import Signup from './component/Signup'
import Notes from './component/Notes'
import About from './component/About'
import Alert from './component/Alert'


import { Routes, Route } from "react-router-dom";

function App() {
  const host = process.env.REACT_APP_BASE_URL;
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});
  let [loggedin, setLoggedin] = useState((localStorage.getItem('authtoken') ? true : false) && localStorage.getItem('authtoken') !== 'undefined')
  let [alert, setAlert] = useState([])
  let [loading, setLoading] = useState(false)

  

  const setAlrt = (arr) => {
    setAlert(arr)
  }

  const setLogin = (flag) => {
    setLoggedin(flag)
  }

  const getNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/notes/getnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('authtoken')
        }
      })
      const newNotes = await response.json();
      if (loggedin) {
        setNotes(newNotes);
        setLoading(false)
      }
    } catch (error) {
      setNotes([])
      setAlert(['danger', 'ERROR...'])
      setLoading(false)
    }
  }

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('authtoken')
        },
        body: JSON.stringify({ title, description, tag })
      })
      const json = await response.json()
      getNotes();
      setAlert(['success', 'Your note has been added successfully...'])
    } catch (error) {
      setAlert(['danger', 'Note is note added.'])
    }
  }

  const editNote = async (id, note) => {
    try {
      const response = await fetch(`${host}/api/notes/editnote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('authtoken')
        },
        body: JSON.stringify(note)
      })
      const json = await response.json()
      getNotes();
      setAlert(['success', 'Note has been edited successfully..'])
    } catch (error) {
      setAlert(['danger', 'Note is not edited..'])
    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('authtoken')
        },
      })
      const json = await response.json()
      getNotes();
      setAlert(['success', 'Note has been deleted successfully...'])
    } catch (error) {
      setAlert(['danger', 'Error : Note has not deleted'])
    }
  }

  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('authtoken')
      }
    })
    const newUser = await response.json();
    if (newUser.name) {
      setUser(newUser);
    }
  }

  const updateUser = async (name, mobile, country, email, password, newPassword) => {
    try {
      const response = await fetch(`${host}/api/auth/edituser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('authtoken')
        },
        body: JSON.stringify({ name, mobile, country, email, password, newPassword })
      })
      const newUser = await response.json();
      if (newUser.name) {
        setUser(newUser)
        setAlert(['success', 'User Details Updated Successfully...'])
        return true;
      }else{
        setAlert(['danger', 'ERROR : user Details has not updated successfully..'])
        return false
      }

    } catch (error) {
      setAlert(['danger', 'ERROR : user Details has not updated successfully..'])
      return false;
    }
  }

  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const user = await response.json()
      if (user.authtoken) {
        setUser(user);
        setAlert(['success', 'user login successfully...'])
        localStorage.setItem('authtoken',user.authtoken)
        setLoggedin(true)
      } else {
        setAlert(['danger', 'ERROR : Invalid Credintials... Try again...'])
      }
      return user;
    } catch (error) {
      setAlert(['danger',error.message])
    }
  }

  const createUser = async (name, email, mobile, country, password) => {
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        body: JSON.stringify({ name, email, mobile, country, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const user = await response.json();
      if (user.authtoken) {
        setUser(user);
        setAlert(['success', 'User created successfully...'])
        localStorage.setItem('authtoken', user.authtoken)
        setLoggedin(true)
      } else {
        setAlert(['danger', 'ERROR : Invalid details...'])
      }


    } catch (error) {
      setAlert(['danger', 'ERROR : Invalid details...'])
    }
  }


  return (
    <div className="">
      <Navbar loggedin={loggedin} setLogin={setLogin} />
      <Alert alert={alert} />
      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/profile" element={<Profile name={user.name} email={user.email} mobile={user.mobile} country={user.country} getUser={getUser} updateUser={updateUser} />} />
        <Route exact path="/login" element={<Login loginUser={loginUser} loggedin={loggedin} setLogin={setLogin} />} />
        <Route exact path="/signup" element={<Signup createUser={createUser} loggedin={loggedin} setAlrt={setAlrt} setLogin={setLogin} />} />
        <Route exact path="/" element={<Notes getNotes={getNotes} loading={loading} notes={notes} addNote={addNote} editNote={editNote} deleteNote={deleteNote} loggedin={loggedin} />} />
      </Routes>


    </div>

  );
}

export default App;
