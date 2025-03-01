
import Header from '../component/Header';
import { useAuth } from '../context/AuthContext'

const Admin = () => {
  const[auth,setAuth]=useAuth()
  console.log(auth);
  
  return (
    <div>
      <Header/>
      <div className="container">
      <div className="row">
      <h1>Hello Admin</h1>
      </div>
      </div>
    </div>
  )
}

export default Admin