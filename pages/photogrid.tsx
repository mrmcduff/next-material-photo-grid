import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ElderCardDisplay from '../components/ElderCardDisplay';
import { ElderCards } from '../interfaces/elderCard';

interface Props {
    initialQuery?: ParsedUrlQuery;
    json?: object;
    cards?: ElderCards;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: "100%",
        },
    }),
);

const generateGridItems = (cards?: ElderCards) => {
    if (cards && cards.cards.length > 0) {
        return cards.cards.map((card, index) => {
            return generateGridItem({
                name: card.name,
                setName: card.set.name,
                text: card.text,
                type: card.type,
                imageUrl: card.imageUrl,
                index
            });
        });
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

const PhotoGrid: NextPage<Props> = (props) => {
    const router = useRouter();
    const classes = useStyles();
    console.log(`Router Query ${JSON.stringify(router.query)}`);
    console.log(`Page context query ${JSON.stringify(props.initialQuery)}`);
    console.log(`cards returned from server: ${JSON.stringify(props.cards)}`);

    return (
        <Container maxWidth="md" className={classes.root}>
            <TextField
                label="Card Name"
                id="standard-start-adornment"
                className={clsx(classes.margin, classes.textField)}
                InputProps={{
                    endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                }}
            />
            <Grid container spacing={3}>
                {generateGridItems(props.cards)}
            </Grid>
        </Container>
    );
}

PhotoGrid.getInitialProps = async (ctx) => {
    const response = await axios.get('https://api.elderscrollslegends.io/v1/cards', {
        params: {
            pageSize: 20,
        }
    });

    let cards;
    if (response.status === 200) {
        cards = response.data;
    }
    return {
        initialQuery: ctx.query,
        json: response.data,
        cards,
    }
}

export default PhotoGrid;
