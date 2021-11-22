import React, { useContext, useEffect } from 'react';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';


const ValidarProgramaMonetario = ({ curp, edadValida, children }) => {
    const { beneficiarioMonetario, getBeneficiarioMonetario } = useContext(RegistroSolicitudContext)
    if (edadValida !== undefined) {
        console.log("CURP para validar si existe el programa", curp)

        useEffect(() => {
            getBeneficiarioMonetario(curp);
        }, [edadValida])

        console.log("resultado de la consulta", beneficiarioMonetario);

        if (beneficiarioMonetario)
            return (
                <h1>Ya estas registrado en un programa</h1>
            );
        return children;
    } else {
        return children;
    }
}

export default ValidarProgramaMonetario;