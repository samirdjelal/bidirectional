import React from "react";
import "./App.css";
import CopySvg from "./components/CopySvg";
import arabicText from "./Converter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outputText: "",
    };
    this.handleText = this.handleText.bind(this);
  }

  async componentDidMount() {}

  render() {
    return (
      <div>
        <div
          className=" flex flex-row justify-between 
		items-center py-2 px-6 mb-2 text-xl select-none"
        >
          {/* <img src="favicon.ico" width={30} height={30} alt="" />
          <p>منسق النص العربي</p> */}
        </div>

        <div className="py-2 px-6">
          <div className="flex justify-between items-center">
            <div
              className="bottom-2 left-2 bg-black"
              onClick={() => this.copyTextToClipboard("input-text")}
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
              onChange={this.handleText}
              style={{ direction: "rtl" }}
            />
          </div>
        </div>

        <div className="py-2 px-6">
          <div className="flex justify-between">
            <div
              className="bottom-2 left-2"
              onClick={() => this.copyOutputToClipboard()}
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
			  // stop text from overflowing outside of the paragraph
			  wordBreak: "break-word",


            }}
          >
            {this.state.outputText}
          </p>
        </div>
      </div>
    );
  }

  handleText(e) {
    const inputText = e.target.value;
    const outputText = arabicText(inputText)["reverse"]();
    this.setState({ outputText: outputText });
  }

  copyOutputToClipboard() {
    const text = document.getElementById('output-text').innerHTML;
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  }
}

export default App;
