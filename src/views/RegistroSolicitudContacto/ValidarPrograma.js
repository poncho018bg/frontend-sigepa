import React from "react";

const ValidarPrograma = ({ idPrograma, children }) => {
    console.log("ValidarPrograma ===>", idPrograma)
    if (idPrograma === undefined || idPrograma === "")
        return (
            <h1>Debes de seleccionar un programa de apoyo</h1>
        );
    return children;
}

export default ValidarPrograma;