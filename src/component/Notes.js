import React, { useEffect, useState } from 'react'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
  const initialNote = { title: '', description: '', tag: 'General' };
  const navigate = useNavigate()

  const [note, setNote] = useState(initialNote);
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    props.getNotes();
    if(!props.loggedin){
      navigate('/login')
    }
  }, [props.loggedin])

  const handleClick = (e) => {
    e.preventDefault();
    props.addNote(note.title, note.description, note.tag);
    setNote(initialNote);
  }

  return (
    <div>
     

      <div className="add container">
        <h1>Add a Note :</h1>
        <form onSubmit={handleClick}>
          <label><span>Title      </span> : <input type="text" name='title' value={note.title} onChange={onChange} minLength={3} placeholder='Enter note Title' required/></label>
          <label><span>Description</span> : <textarea rows={5} name='description' value={note.description} onChange={onChange} placeholder='Enter note description' minLength={3} required/></label>
          <label><span>Tag        </span> : <input type="text" name='tag' value={note.tag} onChange={onChange} placeholder='Ente a Tag (Optional)' /></label>
          <button type='submit' className='submit' > Submit</button>
        </form>
      </div>

      <div className="container">
        <h1>Your Notes :</h1>
        {props.loading? <h2 style={{textAlign:'center'}}>Loading</h2> : <div className="show">
          {props.notes.length === 0 && 'No notes to display'}
          {
            props.notes.map((note) => {
              return <NoteItem key={note._id} id={note._id} title={note.title} tag={note.tag} description={note.description} editNote={props.editNote} deleteNote={props.deleteNote} />
            })
          } 
        </div>}
      </div>


    </div>
  )
}
