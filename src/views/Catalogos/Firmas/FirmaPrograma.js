import React, {  useState } from 'react';


/**
 * Busca los programas a los que se le asigno la firma
 * @param {Firma} Firma 
 * @returns programa.dsprograma
 */
export const FirmaPrograma = ({ Firma }) => {

    const [programa, setPrograma] = useState([]);

    return (
        <span>
            {programa.dsprograma}
        </span>
    )
}