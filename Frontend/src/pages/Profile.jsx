import React, { useContext, useState } from 'react'
import './profile.css'
import {AuthContext} from '../context/AuthProvider.js'
import TopBar from '../components/topBar/TopBar.jsx'
import { Link } from 'react-router-dom'




export default function Profile(){
    const {user} = useContext(AuthContext)
    const [displayFormEmail, setDisplayFormEmail] = useState(false)
    const [displayFormPwd, setDisplayFormPwd] = useState(false)



const handleClickEmail = () =>{
    setDisplayFormEmail(!displayFormEmail);
}

const handleClickPwd = () =>{
    setDisplayFormPwd(!displayFormPwd);
}




    return(
        <>
            <TopBar />
            <div className="wrapper-profile">
                <div className="box-profile">
                    <h2>User data</h2>
                        <div className="wrapper2">
                        
                            <h3>{user.email}</h3> 

                            <button className='changeBtn'><Link to='/changeEmail'className='ChangeText'>Change</Link></button>
                            
                        </div>
                   
                        <div className="wrapper2">
                            <h3>Password</h3>
                            <button className='changeBtn'><Link to='/changePwd' className='ChangeText'>Change</Link></button>
                           
                        </div>
                    
                </div>
            </div>
            


            
            

        </>
    )

}