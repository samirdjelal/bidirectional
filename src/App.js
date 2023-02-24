import React from "react";
import "./App.css";
import CopySvg from "./components/CopySvg";
import arabicText from "./Converter";

function App(props) {
  const [outputText, setOutputText] = React.useState("");

  function handleText(e) {
    const inputText = e.target.value;
	setOutputText(arabicText(inputText)["reverse"]());
  }
  function copyOutputToClipboard() {
    const text = document.getElementById('output-text').innerHTML;
    navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <div style={{marginTop: 20}} className="py-2 px-6">
        <div className="flex justify-between items-center">
          <div
            className="bottom-2 left-2 bg-black"
          >
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
            onClick={() => copyOutputToClipboard()}
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
    </div>
  );
}

export default App;
