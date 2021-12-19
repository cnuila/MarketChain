import React from 'react';
import Compras from './Components/Compras';
import Market from './Components/Market';
import Productos from './Components/Productos';
import SideBar from './Components/SideBar';
import Ventas from './Components/Ventas';

function App() {
  return (
    <div className="container-fluid vh-100 g-0">
      <div className="row g-0">
          <div className='col-2 bg-danger vh-100'>
            <SideBar/>
          </div>
          <div className='col-10 vh-100'>
            <Ventas/>
          </div>
      </div>
    </div>
  );
}

export default App;
