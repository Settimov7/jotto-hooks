import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import Input from './Input';
import languageContext from './contexts/languageContext';
import LanguagePicker from './LanguagePicker';
import successContext from './contexts/successContext';
import Congrats from './Congrats';
import guessedWordsContext from './contexts/guessedWordsContext';
import GuessedWords from './GuessedWords';

/**
 * reducer to update state, called automatically by dispatch
 * @param {object} state - existing state
 * @param {object} action - contains 'type' and 'payload' properties for the state update
 *                          for example: { type: "setSecretWord", payload: "party" }
 * @returns {object} state - new state
 */
const reducer = (state, action) => {
	switch (action.type) {
		case 'setSecretWord': {
			return {
				...state,
				secretWord: action.payload,
			};
		}

		case 'setLanguage': {
			return {
				...state,
				language: action.payload,
			}
		}

		default: {
			throw new Error(`Invalid action type: ${ action.type }`);
		}
	}
};

function App() {
	const [{ secretWord, language }, dispatch] = React.useReducer(reducer, { secretWord: null, language: 'en' });
	const setSecretWord = (secretWord) => dispatch({ type: 'setSecretWord', payload: secretWord });
	const setLanguage = (language) => dispatch({ type: 'setLanguage', payload: language });

	React.useEffect(() => {
		hookActions.getSecretWord(setSecretWord);
	}, []);

	if (!secretWord) {
		return (
			<div className='container' data-test='spinner'>
				<div className='spinner-border' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>

				<p>Loading secret word</p>
			</div>
		);
	}

	return (
		<div className='container' data-test='component-app'>
			<h1>Jotto</h1>
			<languageContext.Provider value={ language }>
				<LanguagePicker setLanguage={ setLanguage }/>

				<guessedWordsContext.GuessedWordsProvider>
					<successContext.SuccessProvider>
						<Congrats/>

						<Input secretWord={ secretWord }/>
					</successContext.SuccessProvider>

					<GuessedWords />
				</guessedWordsContext.GuessedWordsProvider>
			</languageContext.Provider>
		</div>
	);
}

export default App;
