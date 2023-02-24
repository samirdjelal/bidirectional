import React from "react";
import "./App.css";
import CopySvg from "./components/CopySvg";
import PasteSvg from "./components/PasteSvg";
import arabicText from "./Converter";
import AlertCopy from "./components/AlertCopy";
import ClearSvg from "./components/ClearSvg";

function App(props) {
  // State
  const [normalText, setNormalText] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const [triggerCopyAlert, setTriggerCopyAlert] = React.useState({
    active: false,
    label: "",
  });
  // Convert text
  function handleText(e) {
    const inputText = e.target.value;
    setOutputText(arabicText(inputText)["reverse"]());
  }
  //   Copy text to clipboardF
  function copyOutputToClipboard() {
    const text = document.getElementById("output-text").innerHTML;
    navigator.clipboard.writeText(text);
  }

  // Paste text from clipboard
  function pasteTextFromClipboard() {
    navigator.clipboard.readText().then((text) => {
      setOutputText(arabicText(text)["reverse"]());
      setNormalText(text);
    });
  }

  // Clear text
  function clearText() {
    setNormalText("");
    setOutputText("");
  }

  return (
    <div>
      <div style={{ marginTop: 20 }} className="py-2 px-6">
        <div
          onClick={() => {
            // Paste text from clipboard
            pasteTextFromClipboard();
            // Show alert
            setTriggerCopyAlert({ active: true, label: "Pasted!" });
            // Hide alert after 2 seconds
            setTimeout(() => {
              setTriggerCopyAlert({ active: false, label: "" });
            }, 2000);
          }}
          className="flex justify-between items-center"
        >
          <PasteSvg />
          <label
            htmlFor="email"
            className="block text-right text-md font-medium leading-7 text-gray-700 select-none"
          >
            أَدْخَلْ نَصَآ
          </label>
        </div>
        <div className="mt-1 relative rounded-md shadow-sm">
          <textarea
            id="input-text"
            rows={9}
            className="form-input  block w-full sm:text-md sm:leading-5"
            onChange={(e) => {
              // Convert text
              handleText(e);
              // Set normal text
              setNormalText(e.target.value);
            }}
            value={normalText}
            style={{ direction: "rtl" }}
          />
        </div>
      </div>

      <div className="py-2 px-6">
        <div className="flex justify-between">
          <div
            className="bottom-2 left-2"
            onClick={() => {
              // Copy text to clipboard
              copyOutputToClipboard();
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
          <label
            htmlFor="email"
            className="block text-right text-md font-medium 
			  leading-7 text-gray-700 select-none"
          >
            النَّصُّ الْمُحَوِّلُ
          </label>
        </div>
        <div
          style={{
            direction: "rtl",
            marginTop: 10,
            width: "100%",
            minHeight: "40vh",
            backgroundColor: "#a7aaac20",
            borderRadius: 10,
            padding: 10,
            overflowY: "auto",
            wordBreak: "break-word",
          }}
        >
          <button style={{outline: 0}} onClick={clearText}>
            <ClearSvg width={18} height={18}/>
          </button>
          <p id="output-text">{outputText}</p>
        </div>
      </div>
      {/* Show alert if trigger is true, with the right message */}
      {triggerCopyAlert.active && (
        <AlertCopy message={triggerCopyAlert.label} />
      )}
    </div>
  );
}

export default App;
