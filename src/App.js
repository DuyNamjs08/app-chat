import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import SetAvatar from './pages/setAvatar';

function App(props) {
  return (
    <Router>
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='set_avatar' element={<SetAvatar />} />
        <Route path='' element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;