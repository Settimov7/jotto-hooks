import React, { useContext } from 'react';

import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';
import successContext from './contexts/successContext';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if success prop is false)
 */
const Congrats = () => {
	const [success] = successContext.useSuccess();
	const language = useContext(languageContext);

	return (
		<div data-test='component-congrats' className='alert alert-success'>
			{ success && (
				<span data-test='congrats-message'>
					{ stringsModule.getStringByLanguage(language, 'congrats') }
			</span>
			) }
		</div>
	);
};

export default Congrats;