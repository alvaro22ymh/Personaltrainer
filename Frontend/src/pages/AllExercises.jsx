import axios from 'axios';
import Rightbar from '../components/rightBar/Rightbar';
import TopBar from '../components/topBar/TopBar';
import './allExercises.css';

import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider';



export default function AllExercises() {
    const {user,setUser} = useContext(AuthContext)
    const [exercises,setExercises] = useState(null);
    const [error,setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);


    useEffect(()=>{
        const getExercises = async()=>{
                      
          const headers = {
              'Authorization': `Bearer ${user.accessToken}`
          }
          try {
              const res = await axios.get(process.env.REACT_APP_API_URL+'routines/getAllExercises',{headers})
              setExercises(res.data)
              console.log(res.data) 
              
          } catch (err) {
              if(err.response?.status===401){
                  setError(err); 
                  setUser(null)
              }
              else if(err.response?.status===403){
                  setError('jwt invalid or expired');
                  setUser(null)
              }
          }
      }
      getExercises()
      
    },[])
  
    
  
    const musclesNames = {
        1: 'Chest',
        2: 'Back',
        3: 'Forearms',
        4: 'Shoulders',
        5: 'Triceps',
        6: 'Traps',
        7: 'Biceps',
        8: 'Glute',
        9: 'Quads',
        10: 'hamstrings',
        11: 'Calves',
        12: 'Adductors'
    }

    const toggleModal = () =>{
        setIsOpen(!isOpen);
    }

    return (
    <>
    <TopBar/>
    <Rightbar/>
    <div className="wrapper-exercises">
        <div className="exercices-box">
            <ul className="exercise-list">
              
              
              {!exercises && 
              
                        <li className="Loading">
                            <p>Loading...</p>
                        </li>

              }
             {exercises &&
                    
                            exercises['upperExercises'].map(e => {
                            let muscleId = e['muscle_id'];
                            return (
                            <li key={`upper_${e.exercise_id}`} className="exercise-item">
                                    <p className="exercise-name">{e['exercise_name']}</p>
                                    <p className="muscle-name">{musclesNames[muscleId]}</p>
                            <img src={"/Pictures/"+e.exercise_picture} onClick={toggleModal} className="exercise-img" />
                          
                                    <p>{e.description}</p>
                            </li>)
                        })
                        
                  }
             
            {exercises &&  
                             exercises['lowerExercises'].map(e => {
                            let muscleId = e['muscle_id'];
                            return (
                            <li key={`lower_${e.exercise_id}`} className="exercise-item">
                                <p className="exercise-name">{e['exercise_name']}</p>
                                <p className="muscle-name">{musclesNames[muscleId]}</p>
                            <img src={"/Pictures/"+e.exercise_picture} alt="" className="exercise-img" />
                                <p>{e.description}</p>
                             </li>)
                    })
                }
                        
                        
                        

                       
             
                
             
            
                
              
                
                
            </ul>
        </div>
    </div>    
    </>
  )
}
