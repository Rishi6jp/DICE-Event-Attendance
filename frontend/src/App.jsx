import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Signin from './pages/Signin';
import Signup from './pages/SIgnup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={< Signin />}/>
        <Route path="/signup" element={< Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;