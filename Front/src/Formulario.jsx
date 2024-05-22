import React from 'react'
import '../src/Formulario.css'
import inputJuridica from "../public/ley-publica.png"
import nitorut from "../public/nit.png"
import raSocial from "../public/razonsocial.png"
import representante from "../public/rprlegal.png"
import telefono from "../public/telefono.png"
import email from "../public/email.png"
import localizacion from "../public/localizacion.png"
import direccioncasa from "../public/direcciondecasa.png"
import { useState, useEffect } from 'react'
import { usuarios } from './assets/dataBase'
import axios from "axios"
import Swal from "sweetalert2"


function Formulario() {
    const [values, setvalues] = useState("");
    const [tipoPersona, setTipoPersona] = useState("");
    const [nitORut, setnitORut] = useState("");
    const [razonSocial, setrazonSocial] = useState("");
    const [nRepresentante, setnRepresentante] = useState("");
    const [nTelefono, setnTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setdireccion] = useState("");

    const [errors, setErrors] = useState({});

    const registrar = (event) => {
        const { name, value } = event.target;
        setvalues(
            {
                ...values,
                [name]: value,
            }
        )

        if (name === 'tipoPersona' && value === '') {
            setErrors({ ...errors, [name]: 'Este campo es obligatorio' });
        } else if (name === 'nitORut' && (value === '' || !/^\d{1,10}$/.test(value))) {
            setErrors({ ...errors, [name]: 'Ingrese solo numeros un máximo de 10 dígitos' });
        } else if (name === 'razonSocial' && (value === '' || !/^[a-zA-Z\s]{1,20}$/.test(value))) {
            setErrors({ ...errors, [name]: 'Ingrese solo letras, máximo 20 caracteres' });
        } else if (name === 'nRepresentante' && (value === '' || !/^[a-zA-Z\s]{1,20}$/.test(value))) {
            setErrors({ ...errors, [name]: 'Ingrese solo letras, máximo 20 caracteres' });
        } else if (name === 'nTelefono' && (value === '' || !/^\d{1,10}$/.test(value))) {
            setErrors({ ...errors, [name]: 'Ingrese solo numeros un máximo de 10 dígitos' });
        } else if (name === 'correo' && (value === '' || !/^\S+@\S+\.\S+$/.test(value))) {
            setErrors({ ...errors, [name]: 'Ingrese un correo electrónico válido' });
        } else if (name === 'direccion' && value.length > 50) {
            setErrors({ ...errors, [name]: 'Máximo 50 caracteres permitidos' });
        } else {
            setErrors({ ...errors, [name]: '' });
        }
    

    }

    
    const guardarFormulario = (event) => {
        event.preventDefault();
        if (Object.values(errors).some(error => error !== '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pueden guardar los datos debido a errores en el formulario.',
            });
            return; 
        }
        console.log(values)
        
    }

    
    return (
        <div>
            <div className="container">
                <h1 style={{ fontFamily: 'Lato, sans-serif', fontSize: '50px', color: '#33AFFF' }}>Registro de Proveedores</h1>
                <form >
                    <fieldset>
                        <div className="form-group">
                            <img className='primeraImg' src={inputJuridica} alt="inputJuridica" />
                            <select onChange={registrar} className="selector" id="selector" name="tipoPersona">
                                <option value="" disabled selected>Tipo de persona (*)</option>
                                <option value="persona-natural">Persona Natural</option>
                                <option value="persona-juridica">Persona juridica</option>
                            </select>
                            {errors.tipoPersona && <span className="error">{errors.tipoPersona}</span>}
                        </div>
                        <div className="form-group">
                            <img className='primeraImg' src={nitorut} alt="imagennit" />
                            <input onChange={registrar} type="text" id="nit" name="nitORut" placeholder="Ingrese NIT o RUT (*)" />
                            {errors.nitORut && <span className="error">{errors.nitORut}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="archivo">Adjunta RUT (*):</label>
                            <input onChange={registrar} type="file" id="archivo" name="archivo" />
                        </div>
                        <div className="form-group">
                            <img className='primeraImg' src={raSocial} alt="" />
                            <input onChange={registrar} type="text" id="rsocial" name="razonSocial" placeholder='Ingrese razon social (*)' />
                            {errors.razonSocial && <span className="error">{errors.razonSocial}</span>}
                        </div>
                        <div className="form-group">
                            <img className='primeraImg' src={representante} alt="" />
                            <input onChange={registrar} type="text" id="rprLegal" name="nRepresentante" placeholder='Nombre representante legal (*)' />
                            {errors.nRepresentante && <span className="error">{errors.nRepresentante}</span>}
                        </div>
                        <div className="form-group">
                            <img className='primeraImg' src={telefono} alt="" />
                            <input onChange={registrar} type="text" id="telefono" name="nTelefono" placeholder='Ingrese numero de telefono (*)' />
                            {errors.nTelefono && <span className="error">{errors.nTelefono}</span>}
                        </div>
                        <div className="form-group">
                            <img className='primeraImg' src={email} alt="" />
                            <input onChange={registrar} type="text" id="email" name="correo" placeholder='Ingrese correo electronico (*)' />
                            {errors.correo && <span className="error">{errors.correo}</span>}
                        </div>
                        <div className="localizacion">
                            <img className='segundaImg' src={localizacion} alt="" />
                            <select onChange={registrar} className="ubicacion" id="pais" name="pais" defaultValue="">
                                <option value="" disabled selected >Pais (*)</option>
                                <option value="colombia">Colombia</option>
                            </select>
                            <select onChange={registrar} className="ubicacion" id="departamento" name="departamento" defaultValue="">
                                <option value="" disabled selected >Departamento (*)</option>
                                <option value="Antioquia">Antioquia</option>
                            </select>
                            <select onChange={registrar} className="ubicacion" id="ciudad" name="ciudad" defaultValue="">
                                <option value="" disabled selected >Ciudad (*)</option>
                                <option value="Medellin">Medellin</option>
                                <option value="Enviago">Envigado</option>
                                <option value="Sabaneta">Sabaneta</option>
                                <option value="Bello">Bello</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <img className='primeraImg' src={direccioncasa} alt="" />
                            <input onChange={registrar} type="text" id="direccion" name="direccion" placeholder='ingrese direccion (*)' />
                            {errors.direccion && <span className="error">{errors.direccion}</span>}
                        </div>
                        <div className="advertencia">
                            <p>Los campos marcados con (*) son obligatorios.</p>
                        </div>

                        <button onClick={guardarFormulario} type="submit">GUARDAR</button>
                    </fieldset>
                </form>


            </div>
        </div>
    )
}

export default Formulario
