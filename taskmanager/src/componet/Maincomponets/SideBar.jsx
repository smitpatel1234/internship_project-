import  { Component } from 'react'
import ic1 from '../../resource/ic1.png'
import ic2 from '../../resource/ic2.png'
import ic3 from '../../resource/ic3.png'
import ic4 from '../../resource/ic4.png'
import ic5 from '../../resource/ic.png'
import { Link } from 'react-router-dom'
export default function SideBar() {
  
    return (
     
         <aside className='sidebar'> 
            <ul> 
              <Link  className='link' to='/dashboardlayout/project/'><li><img src={ic1} alt="project" /><article>project</article></li></Link> 
               <Link  className='link' to='/dashboardlayout/dashboard/'><li><img src={ic2} alt="task" /><article>task</article></li></Link>
               <Link  className='link' to='/dashboardlayout/user/'><li><img src={ic3} alt="user" /><article>user</article></li></Link>
               <Link  className='link' to='/dashboardlayout/role/'><li><img src={ic4} alt="role" /><article>role</article></li></Link>
            </ul>
        </aside>
  
    )
  
}
