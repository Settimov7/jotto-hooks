import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../test/test-utils';
import Input from './Input';

/**
 * Setup function for Input component
 * @returns {ShallowWrapper>}
 */
const setup = () => {
	return shallow(<Input/>);
};

test('Input render without errors', () => {
	const wrapper = setup();
	const input = findByTestAttr(wrapper, 'component-input');

	expect(input).toHaveLength(1);
});