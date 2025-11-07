import React from 'react'

export default function Inputbox({name}) {
  return (
    <div className='inputcom'> 
          <label htmlFor={name}>{name}</label>
          <input name={name}/>
    </div>
  )
}
