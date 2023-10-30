import React from "react";

function InfoPortal({ msg, closeCb }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#00000090",
        transition: "all 0.3s linear",
      }}
      onClick={(e) => {
        closeCb(e);
      }}
    >
      <div
        style={{
          fontSize: "3.5rem",
          padding: "3rem 1.5rem",
          borderRadius: "1rem",
          boxShadow: "0 0 5px #000",
          backgroundColor: "#111",
          color: "#ccc",
          maxWidth: "70%",
          minWidth: "30%",
          textAlign: "center",
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div>Info:</div>
        {msg}
      </div>
    </div>
  );
}

export default InfoPortal;
