import React, { useContext, useEffect, useState, useRef } from 'react';

import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";

/**
 * Esta función realiza la validación si el beneficiario cumple con la edad estipulada en el programa.
 * 
 * @param {idPrograma} idPrograma
 * @param {curp} curp
 * @param {edadValida} edadValida
 * @param {children} children
 * @returns 
 */
const ValidarEdadBeneficiario = ({ idPrograma, curp, edadValida, children }) => {
    console.log("programa " + idPrograma + " curp " + curp + " EDAD " + edadValida);

    const { getByID, programa } = useContext(ProgramasContext);

    //let idProgramalet = '8cbd2101-ef40-4fad-8698-5911ccecaf54';
    if (edadValida !== undefined) {

        /**
         * Consultamos el programa para traer el id de la edad
         */
        useEffect(() => {
            console.log("use effect de programa validar")
            getByID(idPrograma);
            console.log("programa que me trae ===>", programa);
        }, [edadValida])

        if (programa !== null && edadValida !== undefined) {
            const validarEdades = {
                'Menores de 15 años':
                    () => {
                        if (edadValida > 15) {
                            console.log("edadValida ", edadValida);
                            return (<h1>Debes de seleccionar un programa de apoyo acorde a la edad</h1>)
                        } else { return children }
                    }
                ,
                'De 18 a 59 años':
                    () => {
                        if (edadValida < 18 || edadValida > 59) {
                            console.log("edadValida ", edadValida);
                            return (<h1>Debes de seleccionar un programa de apoyo acorde a la edad</h1>)
                        } else { return children }
                    },
                'Mayores de 60 años':
                    () => {
                        if (edadValida < 60) {
                            console.log("edadValida ", edadValida);
                            return (<h1>Debes de seleccionar un programa de apoyo acorde a la edad</h1>)
                        } else { return children }
                    },
            }

            const validarEdadesDefault =
                () => {
                    console.log("edadValida ", edadValida);
                    return children
                };

            const validacion = validarEdades[programa.dsedadbeneficiario] ?
                validarEdades[programa.dsedadbeneficiario]()
                : validarEdadesDefault()
            console.log("RESULTADO VALIDACION ====>", validacion);
            return validacion;
        } else {
            return children;
        }
    } else { return children; }

}

export default ValidarEdadBeneficiario;