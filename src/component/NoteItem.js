import React, { useState } from 'react'

export default function NoteItem(props) {

  let {id, title, tag, description,editNote, deleteNote } = props;
  const [note,setNote] = useState({title,description,tag})


  const handleDelete = () => {
    let cnf = window.confirm('This note will delete permenentaly.?')
    if (cnf) {
      deleteNote(id);
    } 

  }

  const handleClose = ()=>{
    let modal = document.getElementById(`myModal${id}`)
    modal.style.display = 'none'
  }

  const handleEdit = () => {
    let modal = document.getElementById(`myModal${id}`)
    modal.style.display = 'block'
    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'
      }
    }


  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault();
    editNote(id,note);
    document.getElementById(`myModal${id}`).style.display = 'none'
  }

  return (
    <>
      {/* modal  */}
      <div id={`myModal${id}`} className="modal">

        <div className="modal-content">
          <div className="modal-header">
            <h2>Edit Note :</h2>
            <span className="close" onClick={handleClose}>&times;</span>
          </div>
          <form>
          <label><span>Title      </span> : <input type="text" name='title' value={note.title} onChange={onChange} placeholder='Enter note Title'/></label>
          <label><span>Description</span> : <textarea rows={5} name='description' value={note.description} onChange={onChange} placeholder='Enter note description'/></label>
          <label><span>Tag        </span> : <input type="text" name='tag' value={note.tag} onChange={onChange} placeholder='Enter a tag' /></label>
          <button className='submit' onClick={handleClick}> Submit</button>
        </form>
        </div>

      </div>

      <div className="noteItem">
        
        <div className="title">
          
          {tag.length!==0? <div className="badgebox"><span className="badge"> {tag} </span></div> : ''}
          <h2>{title}</h2>
          <i className="delete fa-regular fa-trash-can fa-lg" onClick={handleDelete} style={{ color: "#ff3d3d" }}></i>
          <i className="edit fa-regular fa-pen-to-square fa-lg" onClick={handleEdit} style={{ color: "#89abe6" }}></i>
        </div>
        
        <div className="desc">
          <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {description}</p><br />
        </div>
      </div>
    </>
  )
}
