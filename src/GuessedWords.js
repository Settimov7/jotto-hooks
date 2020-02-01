import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = ({guessedWords}) => {
	let contents = (
		<span data-test='guess-instructions'>
			Try to guess the secret word!
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
				<h3>Guessed Words</h3>

				<table className='table table-sm'>
					<thead className='thead-light'>
						<tr>
							<th>Guess</th>

							<th>Matching Letters</th>
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

GuessedWords.propTypes = {
	guessedWords: PropTypes.arrayOf((
		PropTypes.shape({
			guessedWord: PropTypes.string.isRequired,
			letterMatchCount: PropTypes.number.isRequired,
		})
	)).isRequired
};

export default GuessedWords;