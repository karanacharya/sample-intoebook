import React, { useContext, useEffect } from "react";
import AlertContext from "../context/notes/alertContext";

const Alert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("AlertComponent must be used within an AlertState");
  }
  const { alert, showAlert } = context;

  useEffect(() => {
    showAlert("Alert in Alert component", "success");
    // eslint-disable-next-linen
  }, []);

  const capitalize = (word) => {
    if (word === "danger"){
    word= "error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(alert.type)}</strong> : {alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
