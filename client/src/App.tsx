import React from 'react';
import NavBar from './Features/NavBar';
import {Route, Routes} from 'react-router-dom'
import Notes from './Features/Notes';
import Add from './Features/Add';
import Login from './Features/Login';
import RequireAuth from './Components/RequireAuth';

function App() {
  return (
    <div>
      <div>
      <NavBar />
      <div className='p-10'>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<RequireAuth><Notes/></RequireAuth>}></Route>
          <Route path='/add' element={<RequireAuth><Add/></RequireAuth>}></Route>
          <Route path='/:filterData/:note' element={<Add/>}></Route>
        </Routes>
      </div>
      </div>
    </div>
  );
}

export default App;
