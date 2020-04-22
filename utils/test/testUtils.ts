import { ElderCard } from '../../interfaces/elderCard';

export const generateRandomStrings = (count: number): string[] => {
    const randos: string[] = [];
    for (let i = 0; i < count; i++) {
        randos.push(generateRandomString());
    }
    return randos;
}

export const generateRandomString = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const generateRandomInt = (max: number = 10): number => {
    return Math.floor(Math.random() * (max + 1));
}

export const generateRandomCards = (count: number): ElderCard[] => {
    const cards: ElderCard[] = [];
    for (let i = 0; i < count; i++) {
        cards.push(generateRandomElderCard());
    }
    return cards;
}

export const generateRandomElderCard = (): ElderCard => {
    return {
        name: generateRandomString(),
        rarity: generateRandomString(),
        type: generateRandomString(),
        subtypes: generateRandomStrings(generateRandomInt(3)),
        cost: generateRandomInt(48),
        power: generateRandomInt(96),
        health: generateRandomInt(128),
        set: {
            id: generateRandomString(),
            name: generateRandomString(),
            _self: generateRandomString(),
        },
        soulSummon: generateRandomInt(6),
        soulTrap: generateRandomInt(12),
        text: generateRandomString(),
        attributes: generateRandomStrings(generateRandomInt(4)),
        keywords: generateRandomStrings(generateRandomInt(3)),
        unique: Boolean(generateRandomInt(1)),
        imageUrl: generateRandomString(),
        id: generateRandomString(),
    }
}
