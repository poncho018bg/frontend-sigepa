import React, { createContext, useState } from 'react';

export const ModalContextConfirmacion= createContext();

export const ModalContextConfirmacionProvider = props => {

  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const [modalTitleConfirmacion, setModalTitleConfirmacion] = useState('');
  
  return (
    <ModalContextConfirmacion.Provider
      value={{
        showModalConfirmacion,
        modalTitleConfirmacion,

        setShowModalConfirmacion,
        setModalTitleConfirmacion
      }}
    >
      {props.children}
    </ModalContextConfirmacion.Provider>
  )
}