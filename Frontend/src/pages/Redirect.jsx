import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider'
import axios from '../api/axios'

export default function Redirect() {
    const {user,setUser} = useContext(AuthContext)

    useEffect(() => {
      const setUserWithRefreshToken = async()=>{
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'userGoogle/getUserByRefreshToken',{withCredentials: true})
            
            setUser(res['data']['user'])
        } catch (err) {
            console.log(err.message);
        }
      }
      setUserWithRefreshToken()
    }, [])
    

  return (
    <div>Redirect</div>
  )
}
