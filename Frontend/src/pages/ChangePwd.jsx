import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import './formChangePwdEmail.css'


import React, { useContext, useEffect, useState } from 'react'
import TopBar from '../components/topBar/TopBar'
import axios from '../api/axios'

export default function FormChangePwd() {

const {user} = useContext(AuthContext)

const  [newPwd1,setNewPwd1] = useState('')
const  [newPwd2,setNewPwd2] = useState('')
const [error,setError] = useState('')
const [success,setSuccess] = useState('')

    
    const handleChangePwd1= (e) =>{
        setNewPwd1(e.target.value)
    }
    const handleChangePwd2 = (e) =>{
        setNewPwd2(e.target.value)
    }



    
    const changePwd = async(e)=>{
      const email = user.email
        e.preventDefault();
        if(newPwd1!==newPwd2){
            setError('Paswords doesnt match');
        
        }else{
          setError('');
          const headers = {
            'Authorization': `Bearer ${user.accessToken}`
          }
              try {
                const res = await axios.put(process.env.REACT_APP_API_URL+'user/updateUserPwd',{email:email,password:newPwd2},{headers})
                setSuccess('Password changed successfully')
              } catch (error) {
                
              }
          
          
          }
        

    }
    
   

  return (

    <>
     <TopBar />
      <div className='change-wrapper'>
      <div className="box-changePwdEmail">
            <button className='back'><Link to='/Profile' className='backText'>Back</Link></button>
          <form onSubmit={(e)=>changePwd(e)} className="changePwdEmail">
           
              <div className="data-change">
                <h4 className='changeEmail'> 
                    New Password 
                      <input className='emailPwdInput' type="password" value={newPwd1} autoomplete="off" onChange={handleChangePwd1} /> 
                </h4> 
                <h4 className='changeEmail'> 
                Confirm new password 
                      <input className='emailPwdInput' type="password" value={newPwd2} autoComplete="off" onChange={handleChangePwd2} /> 
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
