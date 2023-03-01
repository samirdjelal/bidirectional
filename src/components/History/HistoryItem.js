import React from "react";
import CopySvg from "../CopySvg";
import AlertCopy from "../AlertCopy";

function HistoryItem(item) {
  const [triggerCopyAlert, setTriggerCopyAlert] = React.useState({
    active: false,
    label: "",
  });
  return (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        fontSize: 14,
        borderTop: "1px solid #f5f5f5",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p
        style={{
          maxWidth: "90%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.item}
      </p>
      <div
        onClick={() => {
          navigator.clipboard.writeText(item.item);
          // Show alert
          setTriggerCopyAlert({ active: true, label: "Copied!" });
          // Hide alert after 2 seconds
          setTimeout(() => {
            setTriggerCopyAlert({ active: false, label: "" });
          }, 2000);
        }}
      >
        <CopySvg />
      </div>
      {/* Show alert if trigger is true, with the right message */}
      {triggerCopyAlert.active && (
        <AlertCopy message={triggerCopyAlert.label} />
      )}
    </div>
  );
}

export default HistoryItem;
