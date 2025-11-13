import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const user = useSelector((state)=>(state.currentUserStore.currentUser))

return (
    user.username ? <Outlet/> : <Navigate to='/'/>
  )
}
export default PrivateRoutes;