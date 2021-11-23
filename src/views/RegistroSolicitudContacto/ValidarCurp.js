import React from "react";

const ValidarCurp = ({ datosCorrectos, children }) => {
    console.log("ValidarPrograma ===>", datosCorrectos)
    if (!datosCorrectos)
        return (
            <h1>La CURP es incorrecta, favor de verificar</h1>
        );
    return children;
}

export default ValidarCurp;