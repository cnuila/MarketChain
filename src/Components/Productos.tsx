import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

interface Producto {
    Id: number;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    UserId: string;
    Disponible: boolean;
}

const Productos: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [productos, setProductos] = useState<Array<Producto>>([]);
    const [productoActual, setProductoActual] = useState<Producto>({ Id: 0, Nombre: "", Descripcion: "", Precio: 0, UserId: "", Disponible: false });
    const [mostrarAdd, setMostrarAdd] = useState<boolean>(false);
    const [mostrarEdit, setMostrarEdit] = useState<boolean>(false);
    const [mostrarError, setMostrarError] = useState<boolean>(false);

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

    const agregarProducto = async () => {
        //cambiar por el user actual
        productoActual.UserId = "1";
        let url = `http://localhost:3001/api/Productos`
            await axios.post(url, productoActual)
                .then(response => {
                    console.log("Creado");
                })
                .catch(error => {
                    console.log(error);
                })
            getProductos();
            toggleAdd();
    }

    const editarProducto = async () => {
        let id = productoActual?.Id;
            let url = `http://localhost:3001/api/Productos/${id}`
            await axios.put(url, productoActual)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
            getProductos();
            toggleEdit();
    }

    const eliminarProducto = async () => {
        let id = productoActual?.Id;
            await axios.delete(`http://localhost:3001/api/Productos/${id}`)
                .then(response => {
                    console.log(response.data.msg);
                })
                .catch(error => {
                    console.log(error);
                })
            getProductos();
    }

    const onClickRow = (id: number) => {
        setProductoActual(productos[id]);
    }

    const onClickEliminar = () => {
        if (productoActual.Nombre === "") {
            toggleError();
        } else {
            eliminarProducto();
        }
    }

    const onClickEditar = async () => {
        if (productoActual.Nombre === "") {
            toggleError();
        } else {
            toggleEdit();
            
        }
    }

    const onClickAdd = () => {
        toggleAdd();
    }

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = target;
        if (type === "checkbox") {
            setProductoActual({ ...productoActual, Disponible: checked });
        } else {
            if (name === "Precio") {
                setProductoActual({ ...productoActual, [name]: parseFloat(value) });
            } else {
                setProductoActual({ ...productoActual, [name]: value });
            }
        }
    }

    const handleOnSubmit = (destino: string) => {
        if (destino === "agregar"){
            agregarProducto();
        } else {
            editarProducto();
        }
        
    }

    const toggleError = () => {
        setMostrarError(!mostrarError);
    }

    const toggleAdd = () => {
        setProductoActual({ Id: 0, Nombre: "", Descripcion: "", Precio: 0, UserId: "", Disponible: false });
        setMostrarAdd(!mostrarAdd);
    }

    const toggleEdit = () => {
        setMostrarEdit(!mostrarEdit);
    }

    return (
        <>
            <h1 className='text-dark pt-3 ps-5'>Mis Productos</h1>
            <div className='container px-5 pt-4'>
                <div className='d-flex flex-row mb-3'>
                    <div className='p-2 ps-0'>
                        <div className="btn btn-primary align-right" onClick={() => onClickAdd()}>
                            <i className="bi bi-plus-circle-fill pe-2" style={{ fontSize: 15 }}></i>
                            Agregar Producto
                        </div>
                    </div>
                    <div className='p-2'>
                        <div className="btn btn-primary align-right" onClick={() => onClickEditar()}>
                            <i className="bi bi-pencil-fill pe-2" style={{ fontSize: 15 }}></i>
                            Editar Producto
                        </div>
                    </div>
                    <div className='p-2'>
                        <div className="btn btn-primary align-right" onClick={() => onClickEliminar()}>
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
                                        productos.map((producto: Producto, index) => {
                                            let className = "";
                                            if (productoActual?.Id === producto.Id) {
                                                className = "table-primary";
                                            }
                                            return (
                                                <tr key={producto.Id} className={className} onClick={() => onClickRow(index)}>
                                                    <th scope="row">{producto.Id}</th>
                                                    <td>{producto.Nombre}</td>
                                                    <td>{producto.Descripcion}</td>
                                                    <td>{producto.Precio}</td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" readOnly checked={producto.Disponible} />
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

            {/* Error */}
            <Modal show={mostrarError} onHide={toggleError} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Debe seleccionar un producto</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={toggleError}>
                        Listo
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add */}
            <Modal show={mostrarAdd} onHide={toggleAdd} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" placeholder="Nombre" name='Nombre' value={productoActual?.Nombre} required onChange={onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <label className="form-label">Descripción</label>
                        <input type="text" className="form-control" placeholder="Descripción" name='Descripcion' value={productoActual?.Descripcion} required onChange={onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <label className="form-label">Precio</label>
                        <input type="number" className="form-control" placeholder="Precio" name='Precio' min={0} value={productoActual?.Precio} required onChange={onChange} />
                    </Form.Group>
                    <Form.Check
                        required
                        label="Disponible"
                        onChange={onChange}
                        checked={productoActual.Disponible}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleAdd}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => handleOnSubmit("agregar")}>
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit */}
            <Modal show={mostrarEdit} onHide={toggleEdit} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" placeholder="Nombre" name='Nombre' value={productoActual?.Nombre} required onChange={onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <label className="form-label">Descripción</label>
                        <input type="text" className="form-control" placeholder="Descripción" name='Descripcion' value={productoActual?.Descripcion} required onChange={onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <label className="form-label">Precio</label>
                        <input type="number" className="form-control" placeholder="Precio" name='Precio' min={0} value={productoActual?.Precio} required onChange={onChange} />
                    </Form.Group>
                    <Form.Check
                        required
                        label="Disponible"
                        onChange={onChange}
                        checked={productoActual.Disponible}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleEdit}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => handleOnSubmit("editar")}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Productos;