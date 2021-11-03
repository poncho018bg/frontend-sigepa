import React from "react";



export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} >
            <br></br><br></br><br></br><br></br>
            <h3>Registro de solicitud exitosa</h3>

            <h4>Número de Folio de Solicitud: {sessionStorage.getItem('foliosol')} </h4>

            <p>
                Para darle continuidad a tu trámite, es necesario conservar el número de folio
            </p>


        </div>
    );
});