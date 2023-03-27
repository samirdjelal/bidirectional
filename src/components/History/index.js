import React from "react";
import HistoryItem from "./HistoryItem";
import useHistory from "../../utils/hooks/useHistory";
import ClearSvg from "../ClearSvg";

function History({ history }) {
  const { clearHistory } = useHistory();
  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#f5f5f510",
        borderRadius: 5,
        marginTop: 10,
        fontSize: 14,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <b>History</b>
        <div onClick={() => clearHistory()}>
          <ClearSvg />
        </div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column-reverse",
      }}>
        {history.map((item, index) => (
          <HistoryItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default History;
