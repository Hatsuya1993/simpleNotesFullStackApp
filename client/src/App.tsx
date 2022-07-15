import React from 'react';
import NavBar from './Features/NavBar';
import * as ReactRouterDOM from 'react-router-dom'
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
        <ReactRouterDOM.Routes>
        <ReactRouterDOM.Route path='/' element={<Login/>}></ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/login' element={<Login/>}></ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/user/:uid' element={<RequireAuth><Notes/></RequireAuth>}></ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/user/:uid/manage' element={<RequireAuth><Login/></RequireAuth>}></ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/user/:uid/add' element={<RequireAuth><Add/></RequireAuth>}></ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/:uid/:filterData/:note' element={<RequireAuth><Add/></RequireAuth>}></ReactRouterDOM.Route>
        </ReactRouterDOM.Routes>
      </div>
      </div>
    </div>
  );
}

export default App;
