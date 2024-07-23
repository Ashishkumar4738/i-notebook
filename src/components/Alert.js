import React from "react";

function Alert(props) {
  function toUpper() {
    let type = props.alert.type;
    if(props.alert.type==="danger"){
      type = "error";
    }else if(props.alert.type==="warning"){
      
    }
    let first = type.charAt(0).toUpperCase();
    let mainType = first + type.slice(1);
    return mainType;
  }
  return (
    <>
      <div className="d-flex justify-content-end" style={{height:"60px"}} >
        <div className="alert position-fixed z-1  ">
          {props.alert && (
            <div className={`alert alert-${props.alert.type}`} role="alert">
              <strong>{toUpper()}!</strong> {props.alert.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Alert;
