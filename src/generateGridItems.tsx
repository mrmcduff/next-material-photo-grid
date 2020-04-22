import React from 'react';
import Grid from '@material-ui/core/Grid';

import { ElderCard } from '../interfaces/elderCard';
import ElderCardDisplay from '../components/ElderCardDisplay';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export const renderShruggie = (): React.ReactNode => {
    const shruggieText = '¯\\_(ツ)_/¯'
    return (
            <Grid item xs={12}>
                <Box margin="8">
                    <Typography variant="h3">{shruggieText}</Typography>
                    <Typography variant="body1">No cards found with that name. Try a different search term.</Typography>
                </Box>
            </Grid>
        );
}

export const generateGridItems = (loading: boolean, cards?: ElderCard[]): React.ReactNode => {
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
    } else if (loading) {
        // Let's not show the shruggie if the reason we're empty is that we're loading.
        return null;
    } else {
        return renderShruggie();
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
