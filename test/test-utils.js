import checkPropTypes from 'check-prop-types';

/**
 * Return node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} value - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test="${ value }"]`);

/**
 * Throw error if conformingProps do not pass propTypes validation.
 * @param {React.Component} component - Component to check props against.
 * @param {object} confirmingProps - Props we expect to conform to defined propTypes.
 */
export const checkProps = (component, confirmingProps) => {
	const propError = checkPropTypes(component.propTypes, confirmingProps, 'prop', component.name);

	expect(propError).toBeUndefined();
};
