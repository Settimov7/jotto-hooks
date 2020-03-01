import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';
import successContext from './contexts/successContext';

const Input = ({ secretWord }) => {
	const [success, setSuccess] = successContext.useSuccess();
	const language = useContext(languageContext);
	const [currentGuess, setCurrentGuess] = React.useState('');

	if (success) {
		return null;
	}

	return (
		<div data-test='component-input'>
			<form className='form-inline'>
				<input
					className='mb-2 mx-sm-3'
					type='text'
					placeholder={ stringsModule.getStringByLanguage(language, 'guessInputPlaceholder') }
					data-test='input-box'
					value={ currentGuess }
					onChange={ (event) => setCurrentGuess(event.target.value) }
				/>

				<button
					className='btn btn-primary'
					data-test='submit-button'
					onClick={ (event) => {
						event.preventDefault();

						if (currentGuess === secretWord) {
							setSuccess(true);
						}

						setCurrentGuess('');
					} }
				>
					{ stringsModule.getStringByLanguage(language, 'submit') }
				</button>
			</form>
		</div>
	);
};

Input.propTypes = {
	secretWord: PropTypes.string.isRequired,
};

export default Input;