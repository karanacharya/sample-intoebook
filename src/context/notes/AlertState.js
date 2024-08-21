import React from 'react'
import AlertContext from './alertContext'
import { useState } from 'react'

const AlertState = (props) => {
  const [alert, setAlert] = useState({ msg: "hii", type: "success" });

    const showAlert = (message, type) => {
      setAlert({
        msg: message,
        type: type
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    };
  
   
  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState
