import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Signin from './pages/Signin';
import Signup from './pages/SIgnup';
import Events from './pages/EventList'
import Create from './pages/CreateEvent'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={< Signin />}/>
        <Route path="/signup" element={< Signup />}/>
        <Route path="/events" element={<Events />}/>
        <Route path='/events/create' element={<Create />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;