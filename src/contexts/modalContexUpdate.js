import React, { createContext, useState } from 'react';

export const ModalContextUpdate = createContext();

export const ModalContextUpdateProvider = props => {

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [modalTitleUpdate, setModalTitleUpdate] = useState('');
  
  return (
    <ModalContextUpdate.Provider
      value={{
        showModalUpdate,
        modalTitleUpdate,

        setShowModalUpdate,
        setModalTitleUpdate
      }}
    >
      {props.children}
    </ModalContextUpdate.Provider>
  )
}