import React, { useContext } from 'react'
import {  AuthContext } from '../../context/AuthProvider'
import './expiredTopBar.css'

export default function ExpiredTopBar() {
  
    const {expired} = useContext(AuthContext)

   return (
    <>
   { expired &&


            <div className="expired">
                Session expired
            </div>
    
    }
    
    </>
  )
}
