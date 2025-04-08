import{BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import Admin from './pages/admin/Admin'
import Manager from './pages/manager'
import User from './pages/User'
import Adminuser from './pages/admin/Adminuser'
import About from './pages/About'
import Contact from './pages/Contact'
import Adminprofile from './pages/admin/Adminprofile'
function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>

       <Route path='/admin' element={<PrivateRoute/>} allowedRoles={['admin']}>
       <Route path='dashboard' element={<Admin/>}/>
       <Route path='users' element={<Adminuser/>}/>
       <Route path='profile' element={<Adminprofile />}/>
       </Route>
       
       <Route path='/manager' element={<PrivateRoute/>} allowedRoles={['admin','manager']}>
       <Route path='dashboard' element={<Manager/>}/>
       </Route>

       <Route path='/user' element={<PrivateRoute/>} allowedRoles={['user']}>
       <Route path='dashboard' element={<User/>}/>

       

       </Route>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
