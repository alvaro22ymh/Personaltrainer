import './topBar.css';
import {AuthContext} from '../../context/AuthProvider.js';
import {Link} from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useContext, useState } from 'react';


export default function TopBar(home=''){

    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu=()=>{
        setIsOpen(!isOpen)
    }

    return (
        <>
        <div className="topbar-wrapper">
        <Link classname='link-to-home' to='/dashboard'>
            <div className='home-container'>
                <h3 className='home-text'>Home</h3>
            </div>
        </Link>
        
       
            <div className="title">
                <h1>Aleatory Routine Creator</h1>
            </div>

            <div className='boxUser' onClick={toggleMenu}>
            <FaUser className='logoUser'/>
            <IoMdArrowDropdown classname='arrow'/>
                {isOpen && (
                    <div className="box-menu">
                        <ul className="user-menu-dropdown">
                        <li ><Link className='text-dropdown' to='/profile'>Profile</Link></li>
                        <li ><Link className='text-dropdown' to='/logout'>log out</Link></li>
                    </ul>
                    </div>
                    
                    )}
            </div>
            
          
             </div>
        
        
        </>

    )
}