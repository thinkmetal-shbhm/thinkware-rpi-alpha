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
        zIndex: 100,
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
        <button
          onClick={(e) => closeCb(e)}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: "auto",
            margin: "1rem",
            border: "none",
            width: "2rem",
            height: "2rem",
            boxShadow: "0 0 5px #000",
            borderRadius: "50%",
            fontSize: "1rem",
            color: "#ddd",
          }}
        >
          X
        </button>
        <div style={{ fontSize: msg.length > 35 && "2.5rem" }}>Info:</div>
        <p style={{ fontSize: msg.length > 35 && "1.5rem" }}>{`${msg}`}</p>
      </div>
    </div>
  );
}

export default InfoPortal;
