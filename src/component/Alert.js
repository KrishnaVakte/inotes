import React, { useEffect } from 'react'

export default function Alert(props) {
    let [status,message] = props.alert;

    useEffect(()=>{
        let alert = document.getElementById('alert');
        alert.style.display='block';
        setTimeout(()=>{
            alert.style.display='none'
        },3000)
    },[props.alert])

  return (
    <div className="alert">
    <div id='alert' className={`alert-${status}`}>
      <span>{message}</span>
    </div>
    </div>
  )
}
