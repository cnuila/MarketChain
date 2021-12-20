import React, { useEffect, useState } from 'react';
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';

interface ProductoMarket {
    Id: number;
    NombreProducto: string;
    NombreUsuario: string;
    Apellido: string;
    Descripcion: string;
    Precio: number;
}

const Market: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [modalVisible, setVisible] = useState(false);
    const [mostarToast, setMostrarToast] = useState(false);
    const [productos, setProductos] = useState([]);
    const [idProducto, setIdProducto] = useState(0);

    useEffect(() => {
        getProductosMarket();
    }, [])

    const toggleComprar = () => {
        setVisible(!modalVisible);
    }

    const OnClickComprar = (id: number) => {
        setIdProducto(id);
        toggleComprar();
    }

    const getProductosMarket = async () => {
        //cambiar por el user Id del usuario
        await axios.get('http://localhost:3001/api/Productos/Market/2')
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

    const comprar = async () => {
        const url = 'http://localhost:3001/api/Ventas';

        //reemplazar con user Id
        const nuevaVenta = {
            UserIdComprador: 2,
            ProductId: idProducto
        }
        await axios.post(url, nuevaVenta)
            .then(data => {
                if (data.status === 201) {
                    toggleComprar();
                    setMostrarToast(true);
                    getProductosMarket();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            {
                loading ?
                    (
                        <div className='d-flex justify-content-center vh-100'>
                            <div className="align-self-center spinner-border" role="status"></div>
                        </div>
                    )
                    :
                    (
                        <>
                            <h1 className='text-dark pt-3 ps-5'>Market</h1>
                            <div className='container px-5 pt-4'>
                                <div className='row'>
                                    {
                                        productos.map((producto: ProductoMarket) => {
                                            return (
                                                <div key={producto.Id} className=' col-4 pb-4'>

                                                    <div className='card bg-primary'>
                                                        <div className='card-body'>
                                                            <h4 className='card-title text-light text-wrap'>{producto.NombreProducto}</h4>
                                                            <h6 className='card-subtitle mb-2 text-dark'>L. {producto.Precio}</h6>
                                                            <h6 className='text-light'>{producto.NombreUsuario} {producto.Apellido}</h6>
                                                            <p className='card-text text-light'>{producto.Descripcion}</p>
                                                            <div className="btn btn-dark align-right" onClick={() => OnClickComprar(producto.Id)}>Comprar</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
            }
            <Modal show={modalVisible} onHide={toggleComprar} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro quieres comprar este producto?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleComprar}>
                        Mejor no
                    </Button>
                    <Button variant="primary" onClick={comprar}>
                        Comprar
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position='top-end'>
                <Toast onClose={() => setMostrarToast(false)} show={mostarToast} delay={3000} autohide bg="success">
                    <Toast.Header>
                        <strong className="me-auto">Notificación</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>¡Compra exitosa!</Toast.Body>
                </Toast>
            </ToastContainer>

        </>
    );
}

export default Market;
