import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../test/test-utils';
import App from './App';
import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

/**
 * Setup function for app component
 * @returns {ReactWrapper>}
 */
const setup = () => {
	mockGetSecretWord.mockClear();
	hookActions.getSecretWord = mockGetSecretWord;

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
