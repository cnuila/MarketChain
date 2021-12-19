import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Producto {
    Id: number;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    Disponible: boolean;
}

const Productos: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getProductos();
    }, [])

    const getProductos = async () => {
        //cambiar por el user Id del usuario
        await axios.get('http://localhost:3001/api/Productos/MisProductos/1')
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
            <h1 className='text-dark pt-3 ps-5'>Mis Productos</h1>
            <div className='container px-5 pt-4'>
                <div className='d-flex flex-row mb-3'>
                    <div className='p-2 ps-0'>
                        <div className="btn btn-primary align-right">
                            <i className="bi bi-plus-circle-fill pe-2" style={{ fontSize: 15 }}></i>
                            Agregar Producto
                        </div>
                    </div>
                    <div className='p-2'>
                        <div className="btn btn-primary align-right">
                            <i className="bi bi-pencil-fill pe-2" style={{ fontSize: 15 }}></i>
                            Editar Producto
                        </div>
                    </div>
                    <div className='p-2'>
                        <div className="btn btn-primary align-right">
                            <i className="bi bi-trash-fill pe-2" style={{ fontSize: 15 }}></i>
                            Eliminar Producto
                        </div>
                    </div>
                </div>
                {
                    loading ?
                        (
                            <div className='d-flex justify-content-center vh-100'>
                                <div className="align-self-center spinner-border" role="status"></div>
                            </div>
                        ) :
                        (
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
                                    {
                                        productos.map((producto: Producto) => {
                                            return (
                                                <tr key={producto.Id}>
                                                    <th scope="row">{producto.Id}</th>
                                                    <td>{producto.Nombre}</td>
                                                    <td>{producto.Descripcion}</td>
                                                    <td>{producto.Precio}</td>
                                                    <td>
                                                        {producto.Disponible ?
                                                        (
                                                            <input className="form-check-input" type="checkbox" checked={true} />
                                                        )
                                                        :
                                                        (
                                                            <input className="form-check-input" type="checkbox" checked={false}/>
                                                        )
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        )
                }
            </div>
        </>
    )
}

export default Productos;