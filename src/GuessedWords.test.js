import React from 'react';
import { shallow } from 'enzyme';

import GuessedWords from './GuessedWords';

import { findByTestAttr, checkProps } from '../test/test-utils';

const defaultProps = {
	guessedWords: [
		{
			guessedWord: 'train',
			letterMatchCount: 3,
		},
	],
};

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} props - Component props specific for this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };

	return shallow(<GuessedWords { ...setupProps }/>);
};

test('doesnt throw warning with expected props', () => {
	checkProps(GuessedWords, defaultProps);
});

describe('if there are no worlds guessed', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup({ guessedWords: [] });
	});

	test('renders without error', () => {
		const component = findByTestAttr(wrapper, 'component-guessed-words');

		expect(component).toHaveLength(1);
	});

	test('renders instructions to guess a word', () => {
		const instructions = findByTestAttr(wrapper, 'guess-instructions');

		expect(instructions.text().length).toBeGreaterThan(0);
	});
});

describe('if there are worlds guessed', () => {
	let wrapper;
	const guessedWords = [
		{
			guessedWord: 'train',
			letterMatchCount: 3,
		},
		{
			guessedWord: 'agile',
			letterMatchCount: 1,
		},
		{
			guessedWord: 'party',
			letterMatchCount: 5,
		},
	];

	beforeEach(() => {
		wrapper = setup({ guessedWords });
	});

	test('renders without error', () => {
		const component = findByTestAttr(wrapper, 'component-guessed-words');

		expect(component).toHaveLength(1);
	});

	test('renders "guessed words" section', () => {
		const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');

		expect(guessedWordsNode).toHaveLength(1);
	});

	test('correct numbers of guessed words', () => {
		const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');

		expect(guessedWordNodes).toHaveLength(guessedWords.length);
	});
});
