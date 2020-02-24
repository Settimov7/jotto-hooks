import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../test/test-utils';

import Congrats from './Congrats';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {object} testValues - Context values specific for this setup
 * @returns {ShallowWrapper}
 */
const setup = ({ success = false, language = 'en' } = {}) => {
	return mount(
		<languageContext.Provider value={ language }>
			<successContext.SuccessProvider value={ [success, jest.fn()] }>
				<Congrats/>
			</successContext.SuccessProvider>
		</languageContext.Provider>
	)
};

describe('languagePicker', () => {
	test('correctly renders congrats string in english default', () => {
		const wrapper = setup({ success: true });

		expect(wrapper.text()).toBe('Congratulations! You guessed the word!')
	});

	test('correctly renders congrats string in emoji', () => {
		const wrapper = setup({ success: true, language: 'emoji' });

		expect(wrapper.text()).toBe('🎯🎉');
	});
});

test('renders without error', () => {
	const wrapper = setup();
	const congrats = findByTestAttr(wrapper, 'component-congrats');

	expect(congrats.length).toBe(1);
});

test('renders no text when "success" is false', () => {
	const wrapper = setup();
	const congrats = findByTestAttr(wrapper, 'component-congrats');

	expect(congrats.text()).toBe('');
});

test('renders non-empty congrats message when "success" is true', () => {
	const wrapper = setup({ success: true });
	const message = findByTestAttr(wrapper, 'congrats-message');

	expect(message.text().length).not.toBe(0);
});