import { Link } from 'react-router-dom';
import './rightbar.css';



export default function Rightbar() {

  
  return (

<div className='rightbar-wrapper'>
        <div className="rightbar-container">
        <Link to='/savedRoutines'><button className='rightbar-buttoms'>Saved routines</button></Link>  
            <Link to='/allExercises'><button className='rightbar-buttoms'>View all exercises</button></Link>    
        </div>    
    </div>
  )
}
