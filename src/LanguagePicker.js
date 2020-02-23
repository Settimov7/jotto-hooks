import React from 'react';
import propTypes from 'prop-types';

const LanguagePicker = ({ setLanguage }) => {
	const languages = [
		{ code: 'en', symbol: '🇺🇸' },
		{ code: 'emoji', symbol: '😊' }
	];

	const languageIcons = languages.map(({ code, symbol }) => (
		<span
			key={ code }
			data-test='language-icon'
			onClick={() => setLanguage(code)}
		>
			{ symbol }
		</span>
	));

	return (
		<div data-test='component-language-picker'>
			{ languageIcons }
		</div>
	);
};

LanguagePicker.propTypes = {
	setLanguage: propTypes.func.isRequired,
};

export default LanguagePicker;