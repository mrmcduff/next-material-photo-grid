import React, { useState, useEffect, useRef, useReducer } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ElderCardDisplay from '../components/ElderCardDisplay';
import { ElderCard } from '../interfaces/elderCard';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { API } from '../utils/constants';
import { getQuerySearchAsStringValue } from '../utils/queryAsString';
import cardReducer, { generateInitialState } from '../utils/cardReducer';

interface Props {
    cards?: ElderCard[];
    totalCount: number;
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
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const generateGridItems = (cards?: ElderCard[]): React.ReactNode => {
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

const makeQueryUrl = (
    pathName: string,
    page?: string | string[],
    search?: string | string[]): string => {
    const pageTerm = page ? `?page=${page}` : '';
    const searchTerm = search ? `${pageTerm ? '&' : '?'}search=${search}` : '';
    return `${pathName}${pageTerm}${searchTerm}`;
}


const PhotoGrid: NextPage<Props> = (props) => {
    const router = useRouter();
    const classes = useStyles();
    const initialSearch = getQuerySearchAsStringValue(router.query);
    const isServerSearched = useRef(props.cards && props.cards.length > 0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const debouncedSearchTerm = useDebouncedValue<string>(searchTerm, 1000);
    const [ state, dispatch ] = useReducer(cardReducer, generateInitialState());

    useEffect(() => {
        if (isServerSearched.current) {
            isServerSearched.current = false;
            if (props.cards) {
                dispatch({ type: 'append', payload: { cards: props.cards, totalCount: props.totalCount } })
            }
            return;
        }
        dispatch({ type: 'clear' });
        setLoading(true);
        axios.get<{ cards: ElderCard[], _totalCount: number }>(API, {
            params: {
                pageSize: 20,
                name: debouncedSearchTerm,
            }
        }).then(response => {
            setLoading(false);
            console.log(response.data);
            console.log(response.data._totalCount);
            dispatch({ type: 'append', payload: { cards: response.data.cards, totalCount: response.data._totalCount } })
        }, error => { console.log(error) });
    }, [debouncedSearchTerm]);

    console.log(`Current loading is ${loading}`);

    useEffect(() => {
        const { page } = router.query;
        const queryUrl = makeQueryUrl(router.pathname, page, debouncedSearchTerm);
        console.log(makeQueryUrl(router.pathname, page, debouncedSearchTerm));
        router.push(queryUrl, undefined, { shallow: true })
    }, [debouncedSearchTerm])

    return (
        <Container maxWidth="md" className={classes.root}>
            <TextField
                label="Card Name"
                id="standard-start-adornment"
                className={clsx(classes.margin, classes.textField)}
                InputProps={{
                    endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                }}
                value={searchTerm}
                onChange={(event) => { setSearchTerm(event.target.value) }}
            />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={3}>
                {generateGridItems(state.cards)}
            </Grid>
        </Container>
    );
}

PhotoGrid.getInitialProps = async (ctx) => {
    const search = getQuerySearchAsStringValue(ctx.query);
    const response = await axios.get<{ cards: ElderCard[], _totalCount: number }>(API, {
        params: {
            pageSize: 20,
            name: search,
        }
    });

    let cards;
    let totalCount = 0;
    if (response.status === 200) {
        cards = response.data.cards;
        totalCount = response.data._totalCount;
    }
    return {
        cards,
        totalCount,
    }
}

export default PhotoGrid;
