import React, { useEffect, useRef, useState } from 'react'
import './recoverPwd.css';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

export default function RecoverPwd() {
    const [email,setEmail] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [token,setToken] = useState('');
    const [tokenSentMsg,setTokenSentMsg] = useState('');
    const [success,setSuccess] = useState('');
    const [enterEmailToRecover,SetEnterEmailToRecover] = useState(true);
    const [enterToken,SetEnterToken] = useState(null);
    const [enterNewPwd,SetEnterNewPwd] = useState(null)
    const emailRef = useRef()
    const errorRef = useRef()
    const tokenRef = useRef()
    const  [newPwd1,setNewPwd1] = useState('')
    const  [newPwd2,setNewPwd2] = useState('')

    const handleChangePwd1= (e) =>{
        setNewPwd1(e.target.value)
    }
    const handleChangePwd2 = (e) =>{
        setNewPwd2(e.target.value)
    }


  useEffect(()=>{
    emailRef.current.focus();
  },[])


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL+'recoverPwd/forgot-password',{email:email})
            SetEnterToken(true)
            SetEnterEmailToRecover(null)
            setTokenSentMsg('Token Sent to email')
        } catch (error) {
            if(!error?.response){
                setErrMsg('No server response')
            }
          
            errorRef.current.focus();
            SetEnterToken(null)
        }
    }

    const handleSubmit2 = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post(process.env.REACT_APP_API_URL+'recoverPwd/verifyToken',{token:token})
            SetEnterNewPwd(true);
            SetEnterToken(null);
        } catch (error) {
            if(!error?.response){
                setErrMsg('No server response')
            }
            else if(error?.response.status===400){
                setErrMsg('Invalid token')
            }
            errorRef.current.focus();
            SetEnterNewPwd(null);
        }
    }

    const handleSubmit3 = async(e)=>{
              e.preventDefault();
              if(newPwd1!==newPwd2){
                setErrMsg('Paswords doesnt match');
              
              }else{
                setErrMsg('');
                
                    try {
                        const res = await axios.put(process.env.REACT_APP_API_URL+'recoverPwd/updatePwd',{email:email,password:newPwd2})
                        setSuccess('Password changed successfully');
                        SetEnterNewPwd(null);
                    } catch (err) {
                        
                        if(!err?.response){
                            setErrMsg('No server response')
                        }
                        
                    }
                
                }
             
    }

  return (
    <>
        <div className="recover-wrapper">
            <div className="recover-box">

                {enterEmailToRecover&& <>
                
                <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <form onSubmit={handleSubmit} className="emailToRecover">
                            <h1 className='login-title'>Recover password</h1>
                                <div className="input-box">
                                    <input 
                                    type="text" 
                                    id='email' 
                                    ref={emailRef} 
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder='Enter your email registered' 
                                    required/>
                            </div>
                            <button className='recover-button'>Send recover Email</button>
                        </form>
                </>
                        
                }

                {enterToken && <>
                    <form onSubmit={handleSubmit2} className="tokenEnter">
                    <p className={tokenSentMsg ? "tokenSentMsg" : "offscreen"} aria-live="assertive">{tokenSentMsg}</p>
                            <h1 className='login-title'>Enter the token</h1>
                                <div className="input-box">
                                    <input 
                                    type="text" 
                                    id='token' 
                                    ref={tokenRef} 
                                    onChange={(e)=>setToken(e.target.value)}
                                    placeholder='Enter Token' 
                                    required/>
                            </div>
                            <button className='recover-button'>Send recover Email</button>
                        </form>
                </>}

                {enterNewPwd && <>
                    <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit3} className="newPwdEnter">
                            <h1 className='login-title'>Create a new password</h1>
                                <div className="input-box">
                                <h4 className='changePwd'> 
                                    New Password 
                                    <input 
                                    type="password" 
                                    value={newPwd1} 
                                    autoComplete="off" 
                                    onChange={handleChangePwd1} /> 
                                </h4> 
                                <h4 className='changePwd'> 
                                Confirm new password 
                                    <input 
                                    type="password" 
                                    value={newPwd2} 
                                    autoComplete="off" 
                                    onChange={handleChangePwd2} /> 
                                </h4> 
                            </div>
                            <button className='recover-button'>Change Password</button>
                        </form>
                </>

                }

                {success && <>
                <div className="success-box">
                     <h1 className="successMsg">Password changed Successfully!</h1>
                    <Link to='/login'><button className="goToLogin">Login</button></Link>
                </div>
                   
                </>

                }
           
            </div>
        </div>
    </>
  )
}
