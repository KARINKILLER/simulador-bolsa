import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoUAH from '../assets/logo_uah_2.png';

const Terms = () => {
    const navigate = useNavigate();

    const irALogin = () => {
        navigate('/');
    };

    return (
        <div className='container bg-app min-vh-100'>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-8'>
                    <h1 className='mt-2 text-center'>Web app para la simulación de inversiones en bolsa y en criptomonedas</h1>
                    <div className='text-center mt-3 mb-4'>
                        <img src = {logoUAH} className='text-center imagen-logo'></img>
                    </div>
                    <div className='card card-app p-4 mt-4 mb-4'>
                        <div className='text-center mb-4'>
                            <h2>Términos y Condiciones</h2>
                        </div>
                        
                        <div>
                            <div className='mb-3'>
                                <h3>Simulación Financiera</h3>
                                <p>
                                    Esta aplicación es una <strong>simulación educativa</strong> de inversión en bolsa. 
                                    Todo el dinero utilizado en la plataforma es completamente <strong>ficticio </strong> 
                                    y no tiene ningún valor real.
                                </p>
                            </div>

                            <div className='mb-3'>
                                <h3>Datos y Precios</h3>
                                <p>
                                    Los precios de acciones y criptomonedas mostrados en la aplicación 
                                    son <strong>datos simulados</strong> que no se corresponden con los valores reales 
                                    del mercado financiero. Estos datos se utilizan únicamente con fines educativos 
                                    y de práctica.
                                </p>
                            </div>

                            <div className='mb-3'>
                                <h3>Propósito Educativo</h3>
                                <p>
                                    El objetivo de esta plataforma es proporcionar una experiencia de aprendizaje 
                                    sobre conceptos de inversión y trading sin riesgo financiero real. <strong>No constituye 
                                    asesoramiento financiero ni recomendaciones de inversión.</strong>
                                </p>
                            </div>

                            <div className='mb-3'>
                                <h3>Limitación de Responsabilidad</h3>
                                <p>
                                    Los desarrolladores de esta aplicación <strong>no se hacen responsables</strong> de ninguna 
                                    decisión de inversión real que pueda tomar el usuario basándose en la 
                                    experiencia obtenida en esta simulación.
                                </p>
                            </div>
                        </div>

                        <div className='text-center mt-2'>
                            <button className='btn btn-app-primary' onClick={irALogin}>
                                Volver al Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
