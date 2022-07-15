import React from "react";
import Error from "../../img/errorMessage.svg";

const ErrorMessage = () => {
  return (
    <div>
      <img
        src={Error}
        alt="Error"
        style={{ width: "100px", height: "100px" }}
      />
      <div style={{ fontSize: "10px"}}> Somethig went wrong</div>
    </div>
  );
};

export default ErrorMessage;
