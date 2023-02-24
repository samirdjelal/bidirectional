import React from "react";
function AlertCopy() {
  return (
    <div style={{
        position: "absolute",
        bottom: "0",
        right: "0",
        margin: "1rem",
        padding: "1rem",
        backgroundColor: "#fff",
        borderRadius: 10,
        zIndex: 100,
        boxShadow: "0 0 10px 0 #00000020",
        userSelect: "none",
    }}>
      Copied{" "}
      <span role={"img"} aria-label="Copeid ">
        ✔️
      </span>
    </div>
  );
}

export default AlertCopy;
