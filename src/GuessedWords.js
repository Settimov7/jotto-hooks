import React from 'react';
import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';
import guessedWordsContext from './contexts/guessedWordsContext';

const GuessedWords = () => {
	const language = React.useContext(languageContext);
	const [guessedWords] = guessedWordsContext.useGuessedWords();

	let contents = (
		<span data-test='guess-instructions'>
			{ stringsModule.getStringByLanguage(language, 'guessPrompt') }
		</span>
	);

	if (guessedWords.length) {
		const guessedWordsRows = guessedWords.map(({ guessedWord, letterMatchCount }, index) => (
			<tr key={ index } data-test='guessed-word'>
				<td>{ guessedWord }</td>

				<td>{ letterMatchCount }</td>
			</tr>
		));

		contents = (
			<div data-test='guessed-words'>
				<h3>{ stringsModule.getStringByLanguage(language, 'guessedWords') }</h3>

				<table className='table table-sm'>
					<thead className='thead-light'>
						<tr>
							<th>{ stringsModule.getStringByLanguage(language, 'guessColumnHeader') }</th>

							<th>{ stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader') }</th>
						</tr>
					</thead>

					<tbody>
						{ guessedWordsRows }
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div data-test='component-guessed-words'>
			{ contents }
		</div>
	);
};


export default GuessedWords;