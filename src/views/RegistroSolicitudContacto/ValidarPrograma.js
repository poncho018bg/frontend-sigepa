import React from "react";

const ValidarPrograma = ({ idPrograma, children }) => {
    if (idPrograma === undefined)
        return (
            <h1>Debes de seleccionar un programa de apoyo</h1>
        );
    return children;
}

export default ValidarPrograma;