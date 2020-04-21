import { ElderCardSet } from './elderCardSet';

export interface ElderCard {
    name: string;
    rarity: string;
    type: string;
    subtypes: string[];
    cost: number;
    power: number;
    health: number;
    set: ElderCardSet;
    soulSummon: number;
    soulTrap: number;
    text: string;
    attributes: string[];
    keywords: string[];
    unique: boolean;
    imageUrl: string;
    id: string;
}
