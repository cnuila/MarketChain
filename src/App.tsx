import React, { useState } from 'react';
import Compras from './Components/Compras';
import Market from './Components/Market';
import Productos from './Components/Productos';
import SideBar from './Components/SideBar';
import Ventas from './Components/Ventas';

const App: React.FC = () => {

  const [vista, setVista] = useState("Market");

  const cambiarVista = (nombreVista: string): void => {
    setVista(nombreVista);
  }

  let componenteAMostrar = <Market/>;
  if(vista === "Compras"){
    componenteAMostrar = <Compras/>;
  } else if(vista === "Productos"){
    componenteAMostrar = <Productos/>;
  } else if(vista === "Ventas"){
    componenteAMostrar = <Ventas/>
  }

  return (
    <div className="container-fluid vh-100 g-0">
      <div className="row g-0">
        <div className='col-2'>
          <SideBar cambiarVista={cambiarVista} vista={vista}/>
        </div>
        <div className='col-10'>
          { componenteAMostrar }
        </div>
      </div>
    </div>
  );
}

export default App;
