import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Link } from 'react-router-dom'
import './Logout.css'
import axios from '../api/axios'




export default function Logout() {
    const {user, setUser} = useContext(AuthContext)
    
    useEffect(() => {
      
    const logout = async() =>{
      if(user) {
            const res= await axios.post(`${process.env.REACT_APP_API_URL}logout`, null, {
              withCredentials: true
            })
            
          setUser(null)
          }
    }
    logout()
      
    },[])
    
    
    

  return (
    <>
    

    <div className='logout-wrapper'>
        <div className="box">
            <h1>Logged Out</h1>
            <div className='lgt-btn'><Link to='/'>Back To home</Link></div>
            <div className='lgt-btn'><Link to='/login'>Login</Link></div>

        </div>
       
    </div>
  </>
  )
}
