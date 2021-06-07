import React from 'react';
import './App.css';
import arabicText from "./Converter";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			outputText: ''
		}
		this.handleText = this.handleText.bind(this);
	}
	
	async componentDidMount() {
	
	}
	
	
	render() {
		return (
			<div>
				<div className="bg-gray-800 text-white py-4 px-6 mb-2 text-center text-xl select-none">مُنَسِّقُ النَّصِّ الْعَرَبِيِّ</div>
				
				<div className="py-2 px-6">
					<div className="flex justify-between items-center">
						<div className="bottom-2 left-2" onClick={()=>this.copyTextToClipboard('input-text')}>
							<svg className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
							</svg>
						</div>
						<label htmlFor="email" className="block font-bold text-right text-md font-medium leading-7 text-gray-700 select-none">أَدْخَلْ
							نَصَآ</label>
					</div>
					<div className="mt-1 relative rounded-md shadow-sm">
						<textarea id="input-text" rows={6} className="form-input text-xl block w-full sm:text-md sm:leading-5" onChange={this.handleText}
						          style={{direction: 'rtl'}}/>
					</div>
				</div>
				
				<div className="py-2 px-6">
					<div className="flex justify-between">
						<div className="bottom-2 left-2" onClick={()=>this.copyTextToClipboard('output-text')}>
							<svg className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
							</svg>
						</div>
						<label htmlFor="email" className="block font-bold text-right text-md font-medium leading-7 text-gray-700 select-none">النَّصُّ
							الْمُحَوِّلُ</label>
					</div>
					<div className="mt-1 relative rounded-md shadow-sm">
						<textarea id="output-text" rows={6} className="form-input text-xl bg-gray-100 block w-full sm:text-md sm:leading-5" style={{direction: 'rtl'}}
						          value={this.state.outputText} readOnly onClick={e => e.target.select()}/>
					</div>
				</div>
			
			</div>
		);
	}
	
	
	handleText(e) {
		const inputText = e.target.value;
		const outputText = arabicText(inputText)['reverse']();
		this.setState({outputText: outputText});
	}
	
	
	copyTextToClipboard(id='') {
		const text = document.getElementById(id).innerText;
		if (!navigator.clipboard) {
			this.fallbackCopyTextToClipboard(text);
			return;
		}
		navigator.clipboard.writeText(text).then(function () {
			console.log('Async: Copying to clipboard was successful!');
		}, function (err) {
			console.error('Async: Could not copy text: ', err);
		});
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
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Fallback: Copying text command was ' + msg);
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}
		
		document.body.removeChild(textArea);
	}
	
	
}

export default App;
