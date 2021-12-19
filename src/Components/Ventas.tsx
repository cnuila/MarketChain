import React from 'react'

export default function Ventas() {
    return (
        <>
            <h1 className='text-dark pt-3 ps-5'>Mis Ventas</h1>
            <div className='container px-5 pt-4'>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Comprador</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Carlos Nuila</td>
                            <td>iPad</td>
                            <td>20000</td>
                            <td>06/12/2000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
