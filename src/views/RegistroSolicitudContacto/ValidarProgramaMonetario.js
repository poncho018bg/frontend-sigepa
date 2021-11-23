import React, { useContext, useEffect } from 'react';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';


const ValidarProgramaMonetario = ({ curp, edadValida, children,setActivar }) => {
    const { beneficiarioMonetario, getBeneficiarioMonetario } = useContext(RegistroSolicitudContext)
    if (edadValida !== undefined) {
        console.log("Monetario curp", curp)

        useEffect(() => {
            getBeneficiarioMonetario(curp);
        }, [edadValida])

        console.log("Monetario resultado", beneficiarioMonetario);

        if (beneficiarioMonetario) {
            setActivar(false);
            return (
                <h1>Ya estas registrado en un programa</h1>
            );
        } else {
            return children;
        }
    } else {
        return children;
    }
}

export default ValidarProgramaMonetario;