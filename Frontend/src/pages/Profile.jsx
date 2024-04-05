import React, { useContext, useEffect, useState } from 'react'
import './profile.css'
import {AuthContext} from '../context/AuthProvider.js'
import TopBar from '../components/topBar/TopBar.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'




export default function Profile(){
    const {user,setUser} = useContext(AuthContext)
    const {setExpired} = useContext(AuthContext)
    const [error,setError ] = useState('')


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


    useEffect(()=>{

       


        const getUser = async()=>{
            const headers = {
                'Authorization': `Bearer ${user.accessToken}`
            }
            
            try {
               
                const res = await axios.get(process.env.REACT_APP_API_URL+'user/getUser',{
                    params:{email:user.email},
                    headers:headers
                })

            } catch (err) {
                if(err.response?.status===401){
                    setError(err);
                    console.log(error);
                    setUser(null)
                }
                else if(err.response?.status===403){
                    setError('jwt invalid or expired');
                    setUser(null)
                    setExpired(true)
                }
            }
        }

        getUser()

    },[user])


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