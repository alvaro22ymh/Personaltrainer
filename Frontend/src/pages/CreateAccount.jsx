import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/axios';
import { Link } from 'react-router-dom';

export default function CreateAccount() {

    const [errMsg,setErrMsg] = useState([]);
    const [email1,setEmail1] = useState('');
    const [email2,setEmail2] = useState('');
    const [username,setUsername] = useState('');
    const [newPwd1,setNewPwd1] = useState('')
    const [newPwd2,setNewPwd2] = useState('')
    const [form,SetForm] = useState(true)
    const [enterToken,SetEnterToken] = useState(false)
    const [tokenSentMsg,setTokenSentMsg] = useState('')
    const [token,setToken] = useState('')
    const [userCreated,SetUserCreated] = useState(null)

    const errorRef = useRef()
    const emailRef1 = useRef()
    const emailRef2 = useRef()
    const usernameRef = useRef()
    const tokenRef = useRef()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        e.preventDefault();
        if(email1!==email2){
            setErrMsg(prev=>[...prev,'Emails doesnt match']);
            setErrMsg(prev=>{
                if(!prev.includes('Emails doesnt match')){
                   return [...prev,'Emails doesnt match']
                }
                return prev;
            })
            return 0
          }else if(newPwd1!==newPwd2){
         
            setErrMsg(prev=>{
                if(!prev.includes('Paswords doesnt match')){
                   return [...prev,'Paswords doesnt match']
                }
                return prev;
            })
            return 0
          }
          setErrMsg([])
        try {
            const verify = await axios.post(process.env.REACT_APP_API_URL+'register/verifyData',{email:email2,username:username,})
            if(verify.status===200){
                const res = await axios.post(process.env.REACT_APP_API_URL+'registerToken/send-verification',{email:email2})
                SetEnterToken(true)
                SetForm(null)
                setTokenSentMsg('Token Sent to email')

            }
            
        } catch (error) {
            if(!error?.response){
       
                setErrMsg(prev=>{
                    if(!prev.includes('No server response')){
                       return [...prev,'No server response']
                    }
                    return prev;
                })
            } else if(error?.response.status===400){
                error.response['data']['errors']['errors'].map(er=>{
                    setErrMsg(prev=>{
                        if(!prev.includes(er['msg'])){
                           return [...prev,er['msg']]
                        }
                        return prev;
                    })
                })
                console.log(error.response['data']['errors']['errors'][0]['msg'])
               
            }
          
            
            SetEnterToken(null)
        }
    }


    
    const handleSubmit2 = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post(process.env.REACT_APP_API_URL+'registerToken/verifyToken',{token:token})
            SetUserCreated(true);
            SetEnterToken(null);
            if(res.status===200){
                try {
                    const res = await axios.post(process.env.REACT_APP_API_URL+'register/createAccount',{
                        email:email2,
                        username:username,
                        password:newPwd2,
                        roles:["User"]
                    })
                    
                  
                } catch (error) {
                    if(!error?.response){
                        
                        setErrMsg(prev=>{
                            if(!prev.includes('No server response')){
                               return [...prev,'No server response']
                            }
                            return prev;
                        })
                        
                    }
                    else if(error?.response.status===400){
                        error.response['data']['errors']['errors'].map(er=>{
                            setErrMsg(prev=>{
                                if(!prev.includes(er['msg'])){
                                   return [...prev,er['msg']]
                                }
                                return prev;
                            })
                        })
                        console.log(error.response['data']['errors']['errors'][0]['msg'])
                       
                    }
                   
                    
                }
                SetUserCreated(true)
            }
        } catch (error) {
            if(!error?.response){
                setErrMsg('No server response')
            }
            else if(error?.response.status===400){
                setErrMsg('Invalid token')
            }
            
            SetUserCreated(null)
        }
    }




  return (
    <>
        <div className="recover-wrapper">
            <div className="recover-box">

                {form && <>
                
               {errMsg && <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> } 
                        <form onSubmit={handleSubmit} className="emailToRecover">
                            <h1 className='login-title'>Create an account</h1>
                                <div className="input-box">
                                    <input 
                                    type="text" 
                                    id='username' 
                                    ref={usernameRef} 
                                    onChange={(e)=>setUsername(e.target.value)}
                                    placeholder='Enter your username' 
                                    required/>
                                </div>
                                <div className="input-box">
                                    <input 
                                    type="text" 
                                    id='email' 
                                    ref={emailRef1} 
                                    onChange={(e)=>setEmail1(e.target.value)}
                                    placeholder='Enter your email' 
                                    required/>
                                </div>
                                <div className="input-box">
                                    <input 
                                    type="text" 
                                    id='email' 
                                    ref={emailRef2} 
                                    onChange={(e)=>setEmail2(e.target.value)}
                                    placeholder='Confirm your email' 
                                    required/>
                                </div>
                                <div className="input-box">
                                    <input 
                                    type="password" 
                                    id='password' 
                                    onChange={(e)=>setNewPwd1(e.target.value)}
                                    placeholder='Create a password' 
                                    required/>
                                </div>
                                <div className="input-box">
                                    <input 
                                    type="password" 
                                    id='password' 
                                    onChange={(e)=>setNewPwd2(e.target.value)}
                                    placeholder='Confirm your password' 
                                    required/>
                                </div>
                               
                            <button className='recover-button'>Create</button>
                        </form>
                </>
                        
                }



            {enterToken && <>
                    <form onSubmit={handleSubmit2} className="tokenEnter">
                    <p className={tokenSentMsg ? "tokenSentMsg" : "offscreen"} aria-live="assertive">{tokenSentMsg}</p>
                    {<p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> } 
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
                            <button className='recover-button'>Verify account</button>
                        </form>
                </>}

                {userCreated && <>
                <div className="success-box">
                     <h1 className="successMsg">Account created Successfully!</h1>
                    <Link to='/login'><button className="goToLogin">Login</button></Link>
                </div>
                   
                </>

                }

            </div>
        </div>
    </>
  )
}
