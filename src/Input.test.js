import React from 'react';
import { shallow } from 'enzyme';

import { checkProps, findByTestAttr } from '../test/test-utils';
import Input from './Input';

/**
 * Setup function for Input component
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = 'party') => {
	return shallow(<Input secretWord={secretWord} />);
};

test('Input render without errors', () => {
	const wrapper = setup();
	const input = findByTestAttr(wrapper, 'component-input');

	expect(input).toHaveLength(1);
});

test('does not throw warning with expected props', () => {
	checkProps(Input, { secretWord: 'party' });
});