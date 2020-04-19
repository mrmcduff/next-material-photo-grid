import { ElderCard } from "../interfaces/elderCard";

export interface CardState {
    cards: ElderCard[];
    totalCount: number;
    currentCount: number;
}

export const generateInitialState = (): CardState => ({
    cards: [],
    totalCount: 0,
    currentCount: 0,
});

interface CardAction {
    type: 'append' | 'clear';
    payload?: {
        cards: ElderCard[];
        totalCount: number;
    }
}

export default function reducer(state: CardState, action : CardAction) {
    switch (action.type) {
        case 'append':
            if (!action.payload || !action.payload.cards) {
                return state;
            }
            return {
                cards: [...state.cards, ...action.payload.cards],
                currentCount: state.cards.length + action.payload.cards.length,
                totalCount: action.payload.totalCount };
        case 'clear':
            return generateInitialState();
        default:
            throw new Error();
    }
}
