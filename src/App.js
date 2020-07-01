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
	
	render() {
		return (
			<div>
				<div className="bg-gray-800 text-white py-4 px-6 mb-2 text-center text-xl select-none">مُنَسِّقُ النَّصِّ الْعَرَبِيِّ</div>
				
				<div className="py-2 px-6">
					<div className="flex justify-between">
						<label htmlFor="email" className="block font-bold text-md font-medium leading-7 text-gray-700 select-none">Enter text</label>
						<label htmlFor="email" className="block font-bold text-right text-md font-medium leading-7 text-gray-700 select-none">أَدْخَلْ
							نَصَآ</label>
					</div>
					<div className="mt-1 relative rounded-md shadow-sm">
						<textarea rows={6} className="form-input text-xl block w-full sm:text-md sm:leading-5" onChange={this.handleText}
						          style={{direction: 'rtl'}}/>
					</div>
				</div>
				
				<div className="py-2 px-6">
					<div className="flex justify-between">
						<label htmlFor="email" className="block font-bold text-md  font-medium leading-7 text-gray-700 select-none">Converted text</label>
						<label htmlFor="email" className="block font-bold text-right text-md font-medium leading-7 text-gray-700 select-none">النَّصُّ
							الْمُحَوِّلُ</label>
					</div>
					<div className="mt-1 relative rounded-md shadow-sm">
						<textarea rows={6} className="form-input text-xl bg-gray-100 block w-full sm:text-md sm:leading-5" style={{direction: 'rtl'}}
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
}

export default App;
