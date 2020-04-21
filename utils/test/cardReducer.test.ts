import reducer, { generateInitialState } from '../cardReducer';

describe('Basic testing for the card reducer', () => {
    it('creates an expected initial state using the clear function', () => {
        const state = generateInitialState();
        const created = reducer(state, { type: 'clear' });
        expect(created).toEqual(state);
    });
});