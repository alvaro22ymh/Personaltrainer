import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import './weekRoutine.css'

export default function WeekroutineDays() {
console.log('Week');
const {user,setUser,setExpired} = useContext(AuthContext)
const [routineDays,setroutineDays] = useState({})
const [reload,setReload] = useState(false)

const [isOpen, setIsOpen] = useState(false);
const [imgSelected, setImgSelected] = useState('');
const [exerciseDesc, setExerciseDesc] = useState('');
const [error,setError] = useState('');
const [successModal,setSuccessModal] = useState(false);

const reps = {
    'streng': '5 x 6-8 (80% MR)',
    'hypertrophy': '4 x 10-12 (70%)',
    'resistence': '3 x 14-18 (50%)'
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

    useEffect(() => {
        const fetchroutineDays = async()=>{
            const headers = {
                'Authorization': `Bearer ${user.accessToken}`
            }
            try {
                const res = await axios.get(process.env.REACT_APP_API_URL+'routines/randomWeekRoutine',{
                params:{frequency: 'week'},
                headers:headers
            })
            setroutineDays(res.data)
            

                console.log(res.data);
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
        fetchroutineDays()
    }, [reload])
    


    const toggleModal = (src=null,description=null) =>{
        setIsOpen(!isOpen);
        src && setImgSelected(src)
        description && setExerciseDesc(description)
    }

    const reloadRoutine = () =>{
        setReload(!reload)
    }

    const toggleSuccessModal = () =>{
        setSuccessModal(!successModal)
    }

    
const saveRoutine = async() =>{
        const jsonString = JSON.stringify(routineDays);
        const headers = {
            'Authorization': `Bearer ${user.accessToken}`
        }
        console.log(jsonString);

        try {
            const res = await axios.post(process.env.REACT_APP_API_URL+'routines/saveRoutine',
                {routine: jsonString,
                  user: user.email},
               { headers:headers}
            )
            setSuccessModal(true)
        } catch (err) {
            if(err.response?.status===400){
                setError(err); 
            }
            else if(err.response?.status===401){
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


  return (
    <>
        <div className="wrapper-week">
        <div className="week-box">
            <div className="boxTitle">
         <h2 className='titleWeekRoutine'>Week Routine</h2>

            </div>
        {
                        
                        Object.keys(routineDays).map(day=>{
                            
                            return (
                                <>
                                <div className="dayTitleBox">
                                    <h3 className='dayOfWeek'>{day}</h3>
                                </div>
                            <ul key={day} className="week-list">
                                {!routineDays[day] && 
                                
                                <li className="Loading">
                                    <p>Loading...</p>
                                </li>
                                }
                           
                            {routineDays[day] &&
                                    
                                            routineDays[day].map(e => {
                                            let muscleId = e['muscle_id'];
                                            return (
                                                
                                            <li key={day+e.exercise_id+e.exercise_name} className="exercise-it">
                                                    <p className="exercise-name">{e['exercise_name']}</p>
                                                    <p className="muscle-name">{musclesNames[muscleId]}</p>
                                                    <p className='reps'>{reps['streng']}</p>
                                                    <botton className="view-exercise" onClick={()=>toggleModal("/Pictures/"+e.exercise_picture,e['description'])}>View</botton>
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
                <div className="buttons">
                    <button onClick={reloadRoutine} className="recreateRoutine">refresh</button>
                    <button onClick={saveRoutine} className="saveRoutine">Save Routine</button>
                </div>
            </div>  

                {isOpen &&
                                <div className='week-modal'> 
                                    <div className="week-modal-content">
                                            <span className='week-close-modal' onClick={toggleModal}>X</span>
                                            <img className='week-imgSelected' src={imgSelected} alt="" />
                                            <p className="desc">{exerciseDesc}</p>
                                    </div>  
                                </div>
                            }

            { successModal &&
                                <div className='success-modal'> 
                                    <div className="success-modalContent">
                                            <span className='success-close-modal' onClick={toggleSuccessModal}>Close</span>
                                            <div className="message-success-modal">
                                                Saved successfully
                                            </div>
                                        

                                        
                                    </div>  
                                </div>
                            }

    </>
  )
}
