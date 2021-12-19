import React from 'react'

export default function Market() {
    return (
        <>
            <h1 className='text-dark pt-3 ps-5'>Market</h1>
            <div className='container px-5 pt-4'>
                <div className='row'>
                    <div className=' col-4 pb-4'>
                        
                        <div className='card bg-primary'>
                            <div className='card-body'>
                                <h4 className='card-title text-light'>iPad</h4>
                                <h6 className='card-subtitle mb-2 text-dark'>$20</h6>
                                <p className='card-text text-light'>Nuevos</p>
                                <a className="btn btn-dark align-right">Comprar</a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
