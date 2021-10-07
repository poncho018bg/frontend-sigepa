import React, { createContext, useState } from 'react';

export const ModalContextDelete = createContext();

export const ModalContextDeleteProvider = props => {

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalTitleDelete, setModalTitleDelete] = useState('');
  
  return (
    <ModalContextDelete.Provider
      value={{
        showModalDelete,
        modalTitleDelete,

        setShowModalDelete,
        setModalTitleDelete
      }}
    >
      {props.children}
    </ModalContextDelete.Provider>
  )
}