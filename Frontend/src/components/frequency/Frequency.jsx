import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import './frequency.css'

export default function Frequency({freq}) {

const {user,setUser,setExpired} = useContext(AuthContext)
const [routine,setRoutine] = useState([])
const [reload,setReload] = useState(false)
const [successModal,setSuccessModal] = useState(false);


const [isOpen, setIsOpen] = useState(false);
const [imgSelected, setImgSelected] = useState('');
const [exerciseDesc, setExerciseDesc] = useState('');
const [error,setError] = useState('');

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
        const fetchRoutine = async()=>{
            const headers = {
                'Authorization': `Bearer ${user.accessToken}`
            }
            try {
                const res = await axios.get(process.env.REACT_APP_API_URL+'routines/randomWeekRoutine',{
                params:{frequency: freq},
                headers:headers
            })
            setRoutine(res.data)
            
            

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
        fetchRoutine()
    }, [reload])
    


    const toggleModal = (src=null,description=null) =>{
        setIsOpen(!isOpen);
        src && setImgSelected(src)
        description && setExerciseDesc(description)
    }
    const toggleSuccessModal = () =>{
        setSuccessModal(!successModal)
    }

    const reloadRoutine = () =>{
        setReload(!reload)
    }

    const saveRoutine = async() =>{
        const jsonString = JSON.stringify(routine);
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
        <div className="wrapper-frequency">
        <div className="frequency-box">
            <ul className="frequency-list">
              
              
              {!routine && 
              
                        <li className="Loading">
                            <p>Loading...</p>
                        </li>

              }
             {routine &&
                    
                            routine.map(e => {
                            let muscleId = e['muscle_id'];
                            return (
                            <li key={e.exercise_id} className="exercise-it">
                                    <p className="exercise-name">{e['exercise_name']}</p>
                                    <p className="muscle-name">{musclesNames[muscleId]}</p>
                                    <p className='reps'>{reps['streng']}</p>
                                    <botton className="view-exercise" onClick={()=>toggleModal("/Pictures/"+e.exercise_picture,e['description'])}>View</botton>
                            
                                    
                            </li>)
                        })
                        
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
                        
        
            </ul>
        </div>
        <div className="buttons">
               <button onClick={reloadRoutine} className="recreateRoutine">refresh</button>
                <button onClick={saveRoutine} className="saveRoutine">Save this routine</button>
        </div>
     
    </div>  

    {isOpen &&
                    <div className='frequency-modal'> 
                        <div className="frequency-modal-content">
                                <span className='frequency-close-modal' onClick={toggleModal}>X</span>
                                <img className='frequency-imgSelected' src={imgSelected} alt="" />
                                <p className="desc">{exerciseDesc}</p>
                        </div>  
                    </div>
                }

    </>
  )
}
