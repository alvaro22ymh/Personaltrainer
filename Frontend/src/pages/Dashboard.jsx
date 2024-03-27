import React, { useState } from 'react'
import './dashboard.css'
import AuthContext from '../context/AuthProvider.js'
import axios from '../api/axios.js'
import TopBar from '../components/topBar/TopBar.jsx'
import Rightbar from '../components/rightBar/Rightbar.jsx'
import { Link } from 'react-router-dom'


export default function Dashboard(){

    const [frequency,setFrequency] = useState('');
    


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