import React from 'react';
import { mount } from 'enzyme';

import { checkProps, findByTestAttr } from '../test/test-utils';
import Input from './Input';
import languageContext from './contexts/languageContext';

/**
 * Setup function for Input component
 * @param {object} testValues - Context and props values for this specific test.
 * @returns {ShallowWrapper}
 */
const setup = ({ secretWord = 'party', language = 'en' } = {}) => {
	return mount(
		<languageContext.Provider value={ language }>
			<Input secretWord={ secretWord }/>
		</languageContext.Provider>
	);
};

describe('languagePicker', () => {
	test('correctly renders submit string in english default', () => {
		const wrapper = setup();
		const submitButton = findByTestAttr(wrapper, 'submit-button');

		expect(submitButton.text()).toBe('Submit');
	});

	test('correctly renders submit string in emoji', () => {
		const wrapper = setup({ language: 'emoji' });
		const submitButton = findByTestAttr(wrapper, 'submit-button');

		expect(submitButton.text()).toBe('🚀');
	});
});

test('Input render without errors', () => {
	const wrapper = setup();
	const input = findByTestAttr(wrapper, 'component-input');

	expect(input).toHaveLength(1);
});

test('does not throw warning with expected props', () => {
	checkProps(Input, { secretWord: 'party' });
});

describe('state controlled input field', () => {
	let mockSetCurrentGuess = jest.fn();
	let wrapper;

	beforeEach(() => {
		mockSetCurrentGuess.mockClear();
		React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

		wrapper = setup();
	});

	test('state updates with value of input box upon change', () => {
		const inputBox = findByTestAttr(wrapper, 'input-box');
		const mockValue = 'train';
		const mockEvent = {
			target: {
				value: mockValue,
			},
		};

		inputBox.simulate('change', mockEvent);

		expect(mockSetCurrentGuess).toHaveBeenCalledWith(mockValue);
	});

	test('field is cleared upon submit button click', () => {
		const submitButton = findByTestAttr(wrapper, 'submit-button');
		const mockEvent = {
			preventDefault() {
			},
		};

		submitButton.simulate('click', mockEvent);

		expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
	});
});