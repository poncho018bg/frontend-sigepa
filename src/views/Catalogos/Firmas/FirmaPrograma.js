import React, { useEffect, useState } from 'react';

import { axiosGetHetoas } from 'helpers/axios';

/**
 * Busca los programas a los que se le asigno la firma
 * @param {Firma} Firma 
 * @returns programa.dsprograma
 */
export const FirmaPrograma = ({ Firma, actualiza }) => {

    const [programa, setPrograma] = useState([]);

    const { _links: { programas: { href } } } = Firma;

    useEffect(() => {
        const GetPrograma = async () => {
            const result = await axiosGetHetoas(href);
            setPrograma(result);
        }
        GetPrograma();
    }, [actualiza]);

    return (
        <span>
            {programa.dsprograma}
        </span>
    )
}