import axios from '../api/axios';
import Frequency from '../components/frequency/Frequency';
import Rightbar from '../components/rightBar/Rightbar';
import TopBar from '../components/topBar/TopBar';
import WeekroutineDays from '../components/weekRoutine/WeekRoutine';
import weekroutineDays from '../components/weekRoutine/WeekRoutine';
import { AuthContext } from '../context/AuthProvider';
import './routines.css';

import React, { useContext, useEffect, useState } from 'react'

export default function Routines() {

  const [frequency,setFrequency] = useState(null);
  const [week,setWeek] = useState(null);
  const {user,setUser} = useContext(AuthContext)


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
  
  const handleFrequency = (freq) =>{
    setFrequency(freq)
  }
  const handleWeek = () =>{
    setWeek('week')
  }

  return (
        <>

        <TopBar/>
        <Rightbar/>
            <div className="routines-wrapper">
              {!(frequency) && (
                    <>
                    {!week &&
                
                          <div className="menu-selection">
                                <button className='routineBtn' onClick={()=>handleFrequency('upperDay')} >UpperBody Routine Day</button>
                                <button className='routineBtn' onClick={()=>handleFrequency('legDay')}>LowerBody Routine Day</button>
                                <button className='routineBtn' onClick={()=>handleWeek('week')}>Week Routine</button>
                          </div>
                  
                    }
                      

                   
                    </>
              
               )}
               
               {frequency && (
                  <div className="frequency-wrapper">

                    <Frequency freq={frequency}/>s
                  </div>
                 
               )
             }

             {week && (
                <div className="week-wrapper">

                  <WeekroutineDays/>
                </div>
              )
             }
            </div>

        </>
  )
}
