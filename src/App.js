import './App.css'
import Home from "./pages/home/Home"
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from "./pages/profile/Profile";
import { useContext } from 'react';
import { AuthContext } from './components/context/AuthContext';
import Messenger from './pages/messenger/Messenger';


function App() {
  const {user}= useContext(AuthContext);
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={user ? <Home/>: <Register/>}></Route>
      <Route path="/login" element={user ? <Home/>: <Login/>}></Route>
      <Route path="/register" element={user ? <Login />:<Register/>}></Route>
      <Route path="/messenger" element={!user ? <Navigate to="/register" />:<Messenger/>}></Route>
      <Route path={`/profile/`+user.username} element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
