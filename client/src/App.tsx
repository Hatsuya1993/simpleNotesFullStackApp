import React from 'react';
import NavBar from './Features/NavBar';
import {Link, Route, Routes} from 'react-router-dom'
import Notes from './Features/Notes';
import Add from './Features/Add';

function App() {
  return (
    <div>
      <NavBar />
      <div className='p-10'>
        <Routes>
          <Route path='/' element={<Notes/>}></Route>
          <Route path='/add' element={<Add/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
