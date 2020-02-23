import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../test/test-utils';
import App from './App';
import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

/**
 * Setup function for app component
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper>}
 */
const setup = (secretWord = 'party') => {
	mockGetSecretWord.mockClear();
	hookActions.getSecretWord = mockGetSecretWord;

	const mockUseReducer = jest.fn().mockReturnValue([
		{ secretWord, language: 'en' },
		jest.fn(),
	]);

	React.useReducer = mockUseReducer;

	return mount(<App/>);
};

test('App renders without error', () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, 'component-app');

	expect(component).toHaveLength(1);
});

describe('getSecretWord calls', () => {
	test('getSecretWord gets called on App mount', () => {
		setup();

		expect(mockGetSecretWord).toHaveBeenCalled();
	});

	test('secretWord does not update on App update', () => {
		const wrapper = setup();

		mockGetSecretWord.mockClear();
		wrapper.update();

		expect(mockGetSecretWord).not.toHaveBeenCalled();
	});
});

describe('secretWord is not null', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup('party');
	});

	test('renders app when secretWord in not null', () => {
		const appComponent = findByTestAttr(wrapper, 'component-app');

		expect(appComponent.exists()).toBe(true);
	});

	test('does not render spinner when secretWord in not null', () => {
		const spinner = findByTestAttr(wrapper, 'spinner');

		expect(spinner.exists()).toBe(false);
	});
});

describe('secretWord is null', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup(null);
	});

	test('does not render app when secretWord in null', () => {
		const appComponent = findByTestAttr(wrapper, 'component-app');

		expect(appComponent.exists()).toBe(false);
	});

	test('renders spinner when secretWord in null', () => {
		const spinner = findByTestAttr(wrapper, 'spinner');

		expect(spinner.exists()).toBe(true);
	});
});
