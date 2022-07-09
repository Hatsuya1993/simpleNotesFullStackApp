import React from 'react';
import NavBar from './Features/NavBar';
import {Route, Routes} from 'react-router-dom'
import Notes from './Features/Notes';
import Add from './Features/Add';
import Login from './Features/Login';
import RequireAuth from './Components/RequireAuth';

const App : React.FC = () => {
  return (
    <div>
      <div>
      <NavBar />
      <div className='p-10'>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/user/:uid' element={<RequireAuth><Notes/></RequireAuth>}></Route>
          <Route path='/user/:uid/manage' element={<RequireAuth><Login/></RequireAuth>}></Route>
          <Route path='/user/:uid/add' element={<RequireAuth><Add/></RequireAuth>}></Route>
          <Route path='/:uid/:filterData/:note' element={<RequireAuth><Add/></RequireAuth>}></Route>
        </Routes>
      </div>
      </div>
    </div>
  );
}

export default App;
