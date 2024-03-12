
import React from 'react'
import {useRef,useState,useEffect,useContext} from  'react'
import {FaUser,FaLock} from "react-icons/fa"
import './login.css'
import {AuthContext} from '../context/AuthProvider.js'
import axios from '../api/axios.js'
export default function Login() {

  const url = process.env.REACT_APP_API_URL

  const {setUser} = useContext(AuthContext)
  const emailRef = useRef()
  const pwdRef = useRef()
  const errorRef = useRef()

  const [email,setEmail] = useState('');
  const [password,setPwd] = useState('');
  const [errMsg,setErrMsg] = useState('');
  const [success,setSuccess] = useState(false);


  useEffect(()=>{
    emailRef.current.focus();
  },[])


  useEffect(()=>{
    setErrMsg('')
  },[email,password])



  const handleSubmit = async (e)  =>{
    e.preventDefault();

    try {
      
        const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, {email, password})
        const accessToken=res?.data?.accessToken;
        console.log(accessToken);
        const roles=res?.data?.userRolesId;
        console.log(roles);
        setUser({email,password,accessToken,roles})
        setEmail(email)
        setPwd(password)
        setSuccess(true)  
    } catch (error) {
      if(!error?.response){
        setErrMsg('No server Response')
      }else if(error.response?.status===400){
        setErrMsg('Missing username or password')
      }else if(error.response?.status===401){
        setErrMsg('Unauthorized')
      }else{
        setErrMsg('Error sending request to api' +error)
      }
      errorRef.current.focus();
      console.log(error);
    }
  }


  return (
    <>
          {success?(
            <div className="wrapper">
              <form>
                <h1>You are logged in!</h1>
                <br/>
                <p>
                    <a href="#">Go to home</a>
                </p>
              </form>
            </div>
          ) : (
      
    
    <div className="login-wrapper">
     
     
        <form onSubmit={handleSubmit}>
      <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className='login-title'>Login</h1>
                <div className="input-box">
                    <input 
                    type="text" 
                    id='email' 
                    ref={emailRef} 
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='Email' 
                    required/>
                    <FaUser className='icon'/>
                </div>

                <div className="input-box">
                    <input 
                    type="password" 
                    id='password' 
                    ref={pwdRef} 
                    onChange={(e)=>setPwd(e.target.value)}
                    placeholder='Password' 
                    required/>
                    <FaLock className='icon'/>
                </div>

                  <div className="forgot-create">
                    <a href='#'>Reset password</a> 
                    <a href='#'>Create an account</a>
                  </div>
                    
                  <button className='login-button'>Login</button>
        </form>
    </div>
    
          )}
          </>

    )
}
