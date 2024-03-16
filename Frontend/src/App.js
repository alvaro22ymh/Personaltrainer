import { useContext } from 'react';
import './App.css';
import {AuthContext} from './context/AuthProvider';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';


import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Profile from './pages/Profile';
import Logout from './pages/logout';
import FormChangeEmail from './pages/ChangeEmail';
import FormChangePwd from './pages/ChangePwd';
import AllExercises from './pages/AllExercises';

function App() {
  const {user} = useContext(AuthContext)


  return (
    <BrowserRouter >
      <Routes>
        <Route  path="/" element={user? <Navigate to="/dashboard"/> : <Navigate to="/"/> }/> 
        <Route  path="/login" element={user? <Navigate to="/dashboard"/> : <Login/> }/> 
        <Route  path="/dashboard" element={!user? <Navigate to="/login"/> : <Dashboard/> }/> 
        <Route  path="/allExercises" element={!user? <Navigate to="/login"/> : <AllExercises/> }/> 
        <Route  path="/profile" element={!user? <Navigate to="/login"/> : <Profile/> }/> 
        <Route  path="/changeEmail" element={!user? <Navigate to="/login"/> : <FormChangeEmail/> }/> 
        <Route  path="/changePwd" element={!user? <Navigate to="/login"/> : <FormChangePwd/> }/> 
        <Route  path="/logout" element={<Logout/> }/> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
