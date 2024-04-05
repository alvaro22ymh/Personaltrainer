import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import './formChangePwdEmail.css'


import React, { useContext, useEffect, useState } from 'react'
import TopBar from '../components/topBar/TopBar'
import axios from '../api/axios'

export default function FormChangeEmail() {

const {user,setUser} = useContext(AuthContext)
const {expired,setExpired} = useContext(AuthContext)

const  [newEmail1,setNewEmail1] = useState('')
const  [newEmail2,setNewEmail2] = useState('')
const [error,setError] = useState('')
const [success,setSuccess] = useState('')

    
    const handleChangeEmail1 = (e) =>{
        setNewEmail1(e.target.value)
    }
    const handleChangeEmail2 = (e) =>{
        setNewEmail2(e.target.value)
    }
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

  

    
    const changeEmail = async(e)=>{
        e.preventDefault();
        const oldEmail = user.email;
        if(newEmail1!==newEmail2){
            setError('Emails doesnt match');
        }else if(oldEmail===newEmail2){
          setError('Email cant be the same to actual');
        }else{
          setError('');
          const headers = {
            'Authorization': `Bearer ${user.accessToken}`
          }
          try {
            const res = await axios.put(process.env.REACT_APP_API_URL+'user/updateUserEmail',{email:newEmail2,oldEmail},{headers})
            setSuccess('Email changed successfully')
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
        

    }
    
   

  return (

    <>
     <TopBar />
     <div className='change-wrapper'>
      <div className="box-changePwdEmail">
       <Link to='/Profile' className='backText'> <button className='back'>Back</button></Link>
          <form onSubmit={(e)=>changeEmail(e)} className="changePwdEmail">
           
              <div className="data-change">
                <h4 className='changeEmail'> 
                    New Email 
                      <input className='emailPwdInput' type="email" value={newEmail1} onChange={handleChangeEmail1} /> 
                </h4> 
                <h4 className='changeEmail'> 
                Confirm new Email 
                      <input className='emailPwdInput' type="email" value={newEmail2} onChange={handleChangeEmail2} /> 
                </h4> 
              </div>
                
                                
            {!success? <button className='save-changes-btn' type="submit">Save Changes</button> 
                     : <div className='successMsgChangeBox'>
                          <p>{success}</p>
                      </div>
                   }

            <div className='errorMsgChangeBox'>
              {error && <p>{error}</p>}
            </div>
        </form>
      </div>
            

    </div>
  
    </>
   
  )
}
