import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

interface Venta {
    Id: number,
    NombreComprador: string,
    Apellido: string,
    NombreProducto: string,
    Precio: number,
    Fecha: Date
}

const Ventas: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        getVentas();
    }, [])

    const getVentas = async () => {
        //cambiar por el user Id del usuario
        await axios.get('http://localhost:3001/api/Ventas/Usuario/1')
            .then(response => {
                setVentas(response.data);
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
            <h1 className='text-dark pt-3 ps-5'>Mis Ventas</h1>
            <div className='container px-5 pt-4'>
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
                                        <th scope="col">Comprador</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ventas.map((venta: Venta) => {
                                            return (
                                                <tr key={venta.Id}>
                                                    <th scope="row">{venta.Id}</th>
                                                    <td>{venta.NombreComprador} {venta.Apellido}</td>
                                                    <td>{venta.NombreProducto}</td>
                                                    <td>{venta.Precio}</td>
                                                    <td>{ (moment(venta.Fecha)).format('DD-MMM-YYYY HH:mm:ss')}</td>
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

export default Ventas;