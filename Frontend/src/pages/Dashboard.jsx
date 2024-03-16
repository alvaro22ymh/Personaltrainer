import React, { useState } from 'react'
import './dashboard.css'
import AuthContext from '../context/AuthProvider.js'
import axios from '../api/axios.js'
import TopBar from '../components/topBar/TopBar.jsx'
import Routines from '../components/routines/Routines.jsx'
import Rightbar from '../components/rightBar/Rightbar.jsx'


export default function Dashboard(){

    const [frequency,setFrequency] = useState('');



    return(
        <>
            <TopBar />
            <Rightbar/>

            <div className="dashboard-wrapper">
                <div className="dashboard-menu">
                    
                </div>
            </div>


            <Routines/>
            

        </>
    )

}