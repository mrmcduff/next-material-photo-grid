import { ElderCard } from "../interfaces/elderCard";

export interface CardState {
    cards: ElderCard[];
}

interface CardAction {
    type: 'append' | 'clear';
    payload: {
        cards: ElderCard[];
    }
}

export function reducer(state: CardState, action : CardAction) {
    switch (action.type) {
        case 'append':
            if (!action.payload || !action.payload.cards) {
                return state;
            }
            return { cards: state.cards.concat(action.payload.cards) };
        case 'clear':
            return { cards: []};
        default:
            throw new Error();
    }
}