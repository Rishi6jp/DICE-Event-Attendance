import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Events from './pages/EventList';
import Create from './pages/CreateEvent';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Help from './pages/Help';
import StudentAttendanceForm from './pages/StudentAttendanceForm';
import PrivateRoute from './components/PrivateRoutes';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={< Signin />}/>
        <Route path="/signup" element={< Signup />}/>

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/> 
        
        <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>}/>
        <Route path='/events/create' element={<PrivateRoute><Create /></PrivateRoute>}/>
        <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>}/>
        <Route path='/help' element={<PrivateRoute><Help /></PrivateRoute>}/>
        <Route path='/attendance/:eventId' element={<PrivateRoute><StudentAttendanceForm /></PrivateRoute>}/>
        <Route path="/admin/*" element={<PrivateRoute><Admin /></PrivateRoute>} />





      </Routes>
    </BrowserRouter>
  )
}

export default App;