import React from 'react';
import Grid from '@material-ui/core/Grid';

import { ElderCard } from '../interfaces/elderCard';
import ElderCardDisplay from '../components/ElderCardDisplay';

export const generateGridItems = (cards?: ElderCard[]): React.ReactNode => {
    if (cards && cards.length > 0) {
        return cards.map((card, index) => {
            return generateGridItem({
                name: card.name,
                setName: card.set.name,
                text: card.text,
                type: card.type,
                imageUrl: card.imageUrl,
                index
            });
        });
    } else {
        return null;
    }
}

const generateGridItem = ({ name, setName, text, type, imageUrl, index }: {
    name: string;
    imageUrl: string;
    setName: string;
    text: string;
    type: string;
    index: number;
}) => {
    return (
        <Grid item xs={12} sm={6} md={4} key={index}>
            <ElderCardDisplay
                name={name}
                setName={setName}
                imageUrl={imageUrl}
                text={text}
                type={type} />
        </Grid>
    );
}
