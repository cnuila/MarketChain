import React from 'react'

interface Props {
    cambiarVista: (nombreVista: string) => void;
    vista: string;
}

interface OpcionesNav {
    nombre: string;
    icono: string;
}

const SideBar: React.FC<Props> = ({ cambiarVista, vista }) => {

    const opcionesNav: Array<OpcionesNav> = [{ nombre: "Market", icono: "shop" },
    { nombre: "Productos", icono: "inboxes-fill" },
    { nombre: "Compras", icono: "bag-check-fill" },
    { nombre: "Ventas", icono: "cash-coin" }];

    return (
        <div className="d-flex flex-column p-3 text-white bg-dark vh-100">

            <div className="mb-3 px-2">
                <p className="fs-4">MarketChain</p>
            </div>

            <div className=''>
                <ul className="nav nav-pills flex-column">
                    {
                        opcionesNav.map((opcion,index) => {
                            let label = "";
                            if (opcion.nombre !== "Market") {
                                label = "Mis " + opcion.nombre;
                            } else {
                                label = opcion.nombre;
                            }

                            if (vista === opcion.nombre) {
                                return (
                                    <li key={index} className="nav-item">
                                        <div className="nav-link active" onClick={() => cambiarVista(opcion.nombre)}>
                                            <i className={`bi bi-${opcion.icono} pe-2`} style={{ fontSize: 18 }}/>
                                            <span className="ps-2 pe-none">{label}</span>
                                        </div>
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={index} className='nav-item'>
                                        <div className="nav-link text-white" onClick={() => cambiarVista(opcion.nombre)}>
                                            <i className={`bi bi-${opcion.icono} pe-2`} style={{ fontSize: 18 }}/>
                                            <span className="ps-2 pe-none">{label}</span>
                                        </div>
                                    </li>
                                );
                            }
                        })
                    }
                </ul>
            </div>

            <div className='mt-auto'>
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong>Nombre Usuario</strong>
            </div>

        </div>
    )
}

export default SideBar;