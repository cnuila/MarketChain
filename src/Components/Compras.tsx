import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

interface Compra {
    Id: number;
    Fecha: Date;
    NombreProducto: string;
    Precio: number;
    NombreUsuario: string;
    Apellido: string;
}

const Compras: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        getCompras();
    }, [])

    const getCompras = async () => {
        //cambiar por el user Id del usuario
        await axios.get('https://marketchain-api.azurewebsites.net/api/Ventas/MisCompras/2')
            .then(response => {
                setCompras(response.data);
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
          <h1 className='text-dark pt-3 ps-5'>Mis Compras</h1>
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
                                        <th scope="col">Producto</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Fecha Compra</th>
                                        <th scope="col">Vendedor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        compras.map((compra: Compra) => {
                                            return (
                                                <tr key={compra.Id}>
                                                    <th scope="row">{compra.Id}</th>
                                                    <td>{compra.NombreProducto}</td>
                                                    <td>{compra.Precio}</td>
                                                    <td>{ (moment(compra.Fecha)).format('DD-MMM-YYYY HH:mm:ss')}</td>
                                                    <td>{compra.NombreUsuario} {compra.Apellido}</td>
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

export default Compras;
