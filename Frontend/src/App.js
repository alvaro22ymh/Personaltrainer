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
import Routines from './pages/Routines';
import SavedRoutines from './pages/SavedRoutines';
import RecoverPwd from './pages/RecoverPwd';
import CreateAccount from './pages/CreateAccount';
import Redirect from './pages/Redirect';

function App() {
  const {user} = useContext(AuthContext)


  return (
    <BrowserRouter >
      <Routes>
        <Route  path="/" element={user? <Navigate to="/dashboard"/> : <Navigate to="/"/> }/> 
        <Route  path="/login" element={user? <Navigate to="/dashboard"/> : <Login/> }/> 
        <Route  path="/redirect" element={user? <Navigate to="/dashboard"/> : <Redirect/> }/> 
        <Route  path="/dashboard" element={!user? <Navigate to="/login"/> : <Dashboard/> }/> 
        <Route  path="/allExercises" element={!user? <Navigate to="/login"/> : <AllExercises/> }/> 
        <Route  path="/profile" element={!user? <Navigate to="/login"/> : <Profile/> }/> 
        <Route  path="/changeEmail" element={!user? <Navigate to="/login"/> : <FormChangeEmail/> }/> 
        <Route  path="/changePwd" element={!user? <Navigate to="/login"/> : <FormChangePwd/> }/> 
        <Route  path="/createRoutine" element={!user? <Navigate to="/login"/> : <Routines/> }/> 
        <Route  path="/savedRoutines" element={!user? <Navigate to="/login"/> : <SavedRoutines/> }/> 
        <Route  path="/recoverPwd" element={<RecoverPwd/> }/> 
        <Route  path="/createAccount" element={<CreateAccount/> }/> 
        <Route  path="/logout" element={<Logout/> }/> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
