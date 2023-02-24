import React from "react";
import "./App.css";
import CopySvg from "./components/CopySvg";
import arabicText from "./Converter";
import AlertCopy from "./components/AlertCopy";

function App(props) {
	// State
  const [outputText, setOutputText] = React.useState("");
  const [triggerCopyAlert, setTriggerCopyAlert] = React.useState(false);
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

  return (
    <div>
      <div style={{ marginTop: 20 }} className="py-2 px-6">
        <div className="flex justify-between items-center">
          <div className="bottom-2 left-2 bg-black">
            {/* <CopySvg tooltip="Paste" /> */}
          </div>
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
            onChange={(e) => handleText(e)}
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
				setTriggerCopyAlert(true);
				// Hide alert after 2 seconds
				setTimeout(() => {
					setTriggerCopyAlert(false);
				}
				, 2000);
				
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
        <p
          id="output-text"
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
          {outputText}
        </p>
      </div>
	  
      {triggerCopyAlert && <AlertCopy />}
    </div>
  );
}

export default App;
