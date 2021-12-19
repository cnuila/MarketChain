import React from 'react'

export default function SideBar() {
    return (
        <div className=''>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">MarketChain</span>
                </a>
            
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link active" aria-current="page">
                            <svg className="bi me-2" width="16" height="16"></svg>
                            Market
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16"></svg>
                            Mis Compras
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16"></svg>
                            Mis Productos
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16"></svg>
                            Mis Ventas
                        </a>
                    </li>
                </ul>
                <div className='ms-auto'>
                    <a className="d-flex align-items-center text-white text-decoration-none">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                        <strong>mdo</strong>
                    </a>
                </div>
            </div>

        </div>
    )
}
