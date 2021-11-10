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
    console.log("PROGRAMA DATOS " + idPrograma + " curp " + curp + " EDAD " + edadValida);

    const { getByID, programa } = useContext(ProgramasContext);

    //let idProgramalet = '8cbd2101-ef40-4fad-8698-5911ccecaf54';
    if (edadValida !== undefined) {

        /**
         * Consultamos el programa para traer el id de la edad
         */
        useEffect(() => {
            getByID(idPrograma);
        }, [edadValida])

        if (programa !== null && edadValida !== undefined) {
            console.log("PROGRAMA DATOS ===>", programa);
            if (programa.norangomaximo === null && programa.norangomaximo === undefined) {
                console.log("PROGRAMA DATOS MAXIMO NULL");
                if (edadValida <= programa.norangominimo) {
                    console.log("PROGRAMA DATOS MAXIMO CUMPLE MINIMO");
                    return children;
                } else {
                    console.log("PROGRAMA DATOS MAXIMO NO CUMPLE MINIMO");
                    return (<>Elegir un programa correcto a la edad que requerida</>)
                }
            } else if (programa.norangominimo === null && programa.norangominimo === undefined) {
                console.log("PROGRAMA DATOS MINIMO NULL");
                if (edadValida >= programa.norangomaximo) {
                    console.log("PROGRAMA DATOS MINIMO CUMPLE MAXIMO");
                    return children;
                } else {
                    console.log("PROGRAMA DATOS MINIMO NO CUMPLE MAXIMO");
                    return (<>Elegir un programa correcto a la edad que requerida</>)
                }
            } else if (programa.norangominimo === null && programa.norangominimo === undefined
                && programa.norangomaximo === null && programa.norangomaximo === undefined) {
                console.log("PROGRAMA DATOS NULL TODO");
                return children;
            } else {
                console.log("PROGRAMA DATOS NINGUNO NULL", programa.norangominimo, edadValida, programa.norangomaximo);
                if (edadValida >= programa.norangominimo && edadValida <= programa.norangomaximo) {
                    console.log("PROGRAMA DATOS NINGUNO NULL CUMPLE 1", programa.norangominimo);
                    console.log("PROGRAMA DATOS NINGUNO NULL CUMPLE 2", programa.norangomaximo);
                    return children;
                } else {
                    console.log("PROGRAMA DATOS NINGUNO NULL NO CUMPLE");
                    return (<>Elegir un programa correcto a la edad que requerida</>)
                }
            }
        } else {
            return children;
        }
    } else { return children; }

}

export default ValidarEdadBeneficiario;