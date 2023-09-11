import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styleCss/style.css';
import Sidebar from './Sidebar';

function App() {
  return (
    <>
      {/* <div className='container-fluid'>
        <div className='row'>
          <div className='col-2'>
            <Sidebar />
          </div>
        </div>
      </div> */}

      <div className='containerApp'>
        <div className='sidebar'>
          <Sidebar />
        </div>

        <div className='content'></div>
      </div>
    </>
  );
}

export default App;
