import React from 'react'
import InputTextInDialog from '../dialogbox/InputTextInDialog.jsx'
function Listview({ sx }) {
  return (
             <div className='filtertasklistview'>
                         <InputTextInDialog
                            sx = {sx}
                           label={"Assigned To"}
                           name={"assigTo"}
                         />
                        </div>
  )
}

export default Listview
