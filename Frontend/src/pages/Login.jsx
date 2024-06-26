
import React from 'react'
import {useRef,useState,useEffect,useContext} from  'react'
import {FaUser,FaLock} from "react-icons/fa"
import './login.css'
import {AuthContext} from '../context/AuthProvider.js'
import axios from '../api/axios.js'
import ExpiredTopBar from '../components/expiredTopBar/ExpiredTopBar.jsx'
import { Link } from 'react-router-dom'
export default function Login() {

  const url = process.env.REACT_APP_API_URL


  const {user,setUser} = useContext(AuthContext)
  const {expired,setExpired} = useContext(AuthContext)
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
      
        const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`,{email, password},{withCredentials:true})
        const accessToken=res?.data?.accessToken;
        
        const roles=res?.data?.userRolesId;

        setUser({email,password,accessToken,roles})
        setEmail(email)
        setPwd(password)
        setSuccess(true)  
        setExpired(null)
        
    } catch (err) {
      if(!err?.response){
        setErrMsg('No server Response')
      }else if(err.response?.status===400){
        setErrMsg('Missing username or password')
      }else if(err.response?.status===401){
        setErrMsg('Unauthorized')
      }else{
        setErrMsg('Error sending request to api' +err)
      }
      errorRef.current.focus();
      
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
      <ExpiredTopBar/>
     
     
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
                    <Link to='/recoverPwd'><a >Reset password</a> </Link>
                    <Link to='/CreateAccount'><a >Create an account</a> </Link>
                    <p className='orlogin'>Or log in with:</p>
                    <Link to='http://localhost:5000/api/auth/google'><a >Google</a></Link>
                  </div>
                    
                  <button className='login-button'>Login</button>
        </form>
    </div>
    
          )}
          </>

    )
}
