import reducer, { generateInitialState } from '../cardReducer';
import { generateRandomElderCard, generateRandomCards } from './testUtils';

describe('Basic testing for the card reducer', () => {
    it('creates an expected initial state using the clear function', () => {
        const state = generateInitialState();
        const created = reducer(state, { type: 'clear' });
        expect(created).toEqual(state);
    });

    it('adds values to an empty state using the append action', () => {
        const state = generateInitialState();
        const firstCard = generateRandomElderCard();
        const updatedState = reducer(state, { type: 'append', payload: { cards: [firstCard], totalCount: 3}});
        expect(updatedState.cards.length).toEqual(1);
        expect(updatedState.cards[0]).toEqual(firstCard);
        expect(updatedState.currentCount).toEqual(1);
        expect(updatedState.totalCount).toEqual(3);
    });

    it('adds values to a nonempty state using the append action and overrides the totalcount', () => {
        const firstSet = generateRandomCards(2);
        const secondSet = generateRandomCards(4);
        const firstReduced = reducer(generateInitialState(), {
            type: 'append',
            payload: { cards: firstSet, totalCount: 24 }
        });
        const secondReduced = reducer(firstReduced, {
            type: 'append',
            payload: { cards: secondSet, totalCount: 36 }
        });
        expect(secondReduced.cards.length).toEqual(6);
        expect(secondReduced.currentCount).toEqual(6);
        expect(secondReduced.totalCount).toEqual(36);
        expect(secondReduced.cards[2]).toEqual(secondSet[0]);
    });

    it('properly clears a filled state', () => {
        const initial = generateInitialState();
        const firstReduced = reducer(generateInitialState(), {
            type: 'append',
            payload: { cards: generateRandomCards(14), totalCount: 1200 }
        });
        const cleared = reducer(firstReduced, { type: 'clear' });
        expect(cleared).toEqual(initial);
    });
});