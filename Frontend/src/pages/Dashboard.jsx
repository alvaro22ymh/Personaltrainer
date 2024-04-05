import React, { useContext, useEffect, useState } from 'react'
import './dashboard.css'
import {AuthContext} from '../context/AuthProvider.js'
import axios from '../api/axios.js'
import TopBar from '../components/topBar/TopBar.jsx'
import Rightbar from '../components/rightBar/Rightbar.jsx'
import { Link} from 'react-router-dom'


export default function Dashboard(){
    const {user,setUser} = useContext(AuthContext)


    const [frequency,setFrequency] = useState('');


    useEffect(() => {
  
    



        const refreshToken = async()=>{
              
            try {
                const res = await axios.get(process.env.REACT_APP_API_URL+'refresh',{withCredentials: true})
                console.log(user);
                setUser(prevUser => ({
                    ...prevUser, // Mantén las propiedades existentes
                    accessToken: res['data']['accessToken'] // Actualiza solo accessToken
                  }))
            } catch (err) {
                console.log(err.message);
            }
        }
        refreshToken()
      }, [])

    return(
        <>
        
                <TopBar />
                    <Rightbar/>

                    <div className="dashboard-wrapper">
                        <div className="dashboard-menu">
                        <Link className='link-newroutine' to='/createRoutine'> <button className='create-routine-btn'>Create a new routine</button></Link>
                        </div>
                    </div>
        </>
         
        )


      
}