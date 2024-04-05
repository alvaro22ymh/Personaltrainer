import axios from 'axios';
import Rightbar from '../components/rightBar/Rightbar';
import TopBar from '../components/topBar/TopBar';
import './savedRoutines.css';

import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { logDOM } from '@testing-library/react';



export default function SavedRoutines() {
    const {user,setUser} = useContext(AuthContext)
    const {expired,setExpired} = useContext(AuthContext)
    const [savedRoutines,setSavedRoutines] = useState(null);
    const [savedRoutinesArray,setSavedRoutinesArray] = useState([]);
    const [savedRoutinesObj,setSavedRoutinesObj] = useState([]);
    const [noRoutinesSaved,setNoRoutinesSaved] = useState(false);
    const [routineToDelete,setRoutineToDelete] = useState(null);

    const [error,setError] = useState('');
    const [success,setSuccess] = useState(null);
    const [successModal,setSuccessModal] = useState(false);
    const [sure,setSure] = useState(false);

    const [modalIsOpen, setIsOpenModal] = useState(false);
    const[routineModal,setRoutineModal] =useState({})
    const[isOpen2,setIsOpen2] =useState(null)
    const [imgSelected,setImgSelected] = useState(null)
    const [exerciseDesc,setExerciseDesc] = useState(null)


    useEffect(()=>{   



        const getExercises = async()=>{
                      
          const headers = {
              'Authorization': `Bearer ${user.accessToken}`
          }
          try {
            const res1 = await axios.get(process.env.REACT_APP_API_URL+'refresh',{withCredentials: true})
                console.log(user);
                setUser(prevUser => ({
                    ...prevUser, // Mantén las propiedades existentes
                    accessToken: res1['data']['accessToken'] // Actualiza solo accessToken
                  }))
              const res = await axios.get(process.env.REACT_APP_API_URL+'routines/getSavedRoutines',{
              params:{user:user.email},
              headers
            })
                if(res['data'].length===-0){
                    setNoRoutinesSaved(true)
                    setSavedRoutines(res.data)
                }else{
                    setNoRoutinesSaved(false) 
                    setSavedRoutines(res.data)
                }
                
 

          } catch (err) {
              if(err.response?.status===401){
                  setError(err); 
                  setUser(null)
              }
              else if(err.response?.status===403){
                  setError('jwt invalid or expired');
                  setUser(null)
                  setExpired(true)
              }
          }
      }
      getExercises()
        
    },[successModal])

   
   
   
  
        const deleteRoutine = async()=>{
                        const headers = {
                            'Authorization': `Bearer ${user.accessToken}`
                        }
                        try {
                            const res = await axios.delete(process.env.REACT_APP_API_URL+'routines/deleteSavedRoutine',{
                            params:{routine_id:routineToDelete},
                            headers
                        })
                        
                            setSuccess(res['data']);
                           setSure(true)
                            
                            
                        } catch (err) {
                            if(err.response?.status===401){
                                setError(err); 
                                setUser(null)
                            }
                            else if(err.response?.status===403){
                                setError('jwt invalid or expired');
                                setUser(null)
                                setExpired(true)
                            }
                            else{
                                setError(err.message)
                                
                            }
                        }
                    }
                           
  
    
    
  
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

    const muscle = (muscleId) =>{
        let muscleName = musclesNames[muscleId];
        return muscleName;
    }
    const reps = {
        'streng': '5 x 6-8 (80% MR)',
        'hypertrophy': '4 x 10-12 (70%)',
        'resistence': '3 x 14-18 (50%)'
    }
    const toggleModal = (routine=null) =>{
        setIsOpenModal(!modalIsOpen);
        routine && setRoutineModal(routine)

    }

    const toggleModal2 = (src=null,description=null) =>{
        setIsOpen2(!isOpen2);
        src && setImgSelected(src)
        description && setExerciseDesc(description)
    }

    const toggleSuccessModal = (routine_id=null) =>{
       setSuccessModal(!successModal);
       routine_id && setRoutineToDelete(routine_id)
       setSure(false)
    }



    return (
    <>
    <TopBar/>
    <Rightbar/>
    <div className="wrapper-exercises">
        <div className="exercices-box">
                {noRoutinesSaved && 
                    
                    <p className='waiting'>No routines saved</p>
                  }
            <ul className="exercise-list">
              
            {!savedRoutines&& 
                    
                    <p className='waiting'>Loading...</p>
                  }
              
             
             {savedRoutines &&
                    
                            savedRoutines.map((routine,index )=> {
                            if(Array.isArray(routine['data'])){
                                return (
                                <li key={index} className="exercise-item">
                                        <p>Routine {index+1}</p>
                                        <p className="exercise-name">{routine['data'][0]['muscle_id']<8 ? 'UpperBody' : 'LowerBody'}</p>
                                        <botton className="view-exercise" onClick={()=>toggleModal(routine['data'])}>View routine</botton>
                                        <botton className="delete-routine" onClick={()=>toggleSuccessModal(routine['id'])}>Delete routine</botton>
                                        
                                </li>)
                            }else{
                            

                                return (
                                    <li key={index} className="exercise-item">
                                            <p>Routine {index+1}</p>
                                            <p>Week aleatory routine</p>
                                            <botton className="view-exercise" onClick={()=>toggleModal(routine['data'])}>View routine</botton>
                                            <botton className="delete-routine" onClick={()=>toggleSuccessModal(routine['id'])}>Delete routine</botton>
                                            
                                    </li>)
                            } 
                                
                            
                        })
                        
                  }

                {modalIsOpen &&
                    (Array.isArray(routineModal) ?
                    <div className='savedRoutine-modal'> 
                        <div className="savedRoutine-modalContent">
                                <span className='savedRoutine-close-modal' onClick={toggleModal}>X</span>
                            

                                <ul className="exercise-lista">
                                {
                                    routineModal.map((e,index)=>{

                                    return (
                                        <li key={index} className="exercise-item-modal">
                                            <p className='reps'>{reps['streng']}</p>
                                            <p className='exercise-name'>{e['exercise_name']}</p>
                                            <p className="muscle-name">{muscle(e['muscle_id'])}</p>
                                            <img className='frequency-imgSelected' src={"/Pictures/"+e['exercise_picture']} alt="exercisePic" />
                                            <p className="desc">{e['description']}</p>
                                        </li>
                                        )
                                    })
                                }

                                </ul>
                        </div>  
                    </div>


                    :

                    <div className="savedRoutine-modal">
                       
                        <div className="wrapper-week">
                        <span className='savedRoutine-close-modal-week' onClick={toggleModal}>Close</span>
                                <div className="week-box">
                                    <div className="boxTitle">
                                <h2 className='titleWeekRoutine'>Week Routine</h2>

                                    </div>
                                {
                                                
                                    Object.keys(routineModal).map(day=>{
                                        
                                        return (
                                            <>
                                            <div className="dayTitleBox">
                                                <h3 className='dayOfWeek'>{day}</h3>
                                            </div>
                                        <ul key={day} className="week-list">
                                            {!routineModal[day] && 
                                            
                                            <li className="Loading">
                                                <p>Loading...</p>
                                            </li>
                                            }
                                    
                                        {routineModal[day] &&
                                                
                                                        routineModal[day].map(e => {
                                                        let muscleId = e['muscle_id'];
                                                        return (
                                                            
                                                        <li key={day+e.exercise_id+e.exercise_name} className="exercise-it">
                                                                <p className="exercise-name">{e['exercise_name']}</p>
                                                                <p className="muscle-name">{musclesNames[muscleId]}</p>
                                                                <p className='reps'>{reps['streng']}</p>
                                                                <botton className="view-exercise" onClick={()=>toggleModal2("/Pictures/"+e.exercise_picture,e['description'])}>View</botton>
                                                        </li>
                            
                                                        )
                                                        
                                                    })             
                                                }
                                            </ul>
                                            </>
                                        )
                                        
                                    })
                                })
                    
                            </div>
              
                        
                      </div>
                    </div>)
                    
                }

                {isOpen2 &&
                                <div className='week-modal'> 
                                    <div className="week-modal-content">
                                            <span className='week-close-modal' onClick={toggleModal2}>X</span>
                                            <img className='week-imgSelected' src={imgSelected} alt="" />
                                            <p className="desc">{exerciseDesc}</p>
                                    </div>  
                                </div>
                            }

                {successModal &&
                
                    <div className='success-modal'> 
                        <div className="success-modalContent">
                                <span className='success-close-modal' onClick={toggleSuccessModal}>Close</span>
                                <div className="message-success-modal">
                                    {!sure && 
                                        <>
                                            <p>Are you sure?</p>
                                            <button className='btn-yes' onClick={deleteRoutine}>Yes</button>
                                            <button className='btn-not' onClick={toggleSuccessModal}>NOT</button>
                                        </>
                                    }
                                    {
                                        sure && <p>Deleted Successfully</p>
                                    }
                                </div>
                            

                            
                        </div>  
                    </div>
                }
             
       
                        
        
            </ul>
        </div>
    </div>  
            
                

    </>
  )
}
