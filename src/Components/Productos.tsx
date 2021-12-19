import React from 'react'

export default function Productos() {
    return (
        <>
            <h1 className='text-dark pt-3 ps-5'>Mis Productos</h1>
            <div className='container px-5 pt-4'>
                <div className='d-flex flex-row mb-3'>
                    <div className='p-2 ps-0'>
                        <a className="btn btn-primary align-right">
                            <i className="bi bi-plus-circle-fill pe-2" style={{ fontSize: 15 }}></i>
                            Agregar Producto
                        </a>
                    </div>
                    <div className='p-2'>
                        <a className="btn btn-primary align-right">
                            <i className="bi bi-pencil-fill pe-2" style={{ fontSize: 15 }}></i>
                            Editar Producto
                        </a>
                    </div>
                    <div className='p-2'>
                        <a className="btn btn-primary align-right">
                            <i className="bi bi-trash-fill pe-2" style={{ fontSize: 15 }}></i>
                            Eliminar Producto
                        </a>
                    </div>
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">¿Disponible?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>iPad</td>
                            <td>Nueva</td>
                            <td>20000</td>
                            <td>true</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
