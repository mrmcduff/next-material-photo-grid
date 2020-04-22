/** React and Next JS imports */
import React, { useState, useEffect, useRef, useReducer } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

/** Material UI imports */
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

/** Other third-party imports */
import { useInfiniteScroll } from 'react-infinite-scroll-hook';

/** Local imports */
import cardReducer, { generateInitialState } from '../utils/cardReducer';
import { ElderCard } from '../interfaces/elderCard';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { generateGridItems } from '../src/generateGridItems';
import { getCards } from '../utils/apiGet';
import { getQueryParameters } from '../utils/getQueryParameters';
import Link from '../components/Link';
import { makeQueryUrl } from '../utils/makeQueryUrl';

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

const PhotoGrid: NextPage<Props> = (props) => {
    const router = useRouter();
    const classes = useStyles();
    const queryParams = getQueryParameters(router.query);
    // Checking to see if we've loaded server-side first to reduce calls to the API
    const isServerSearched = useRef(props.cards && props.cards.length > 0);
    const [loading, setLoading] = useState(false);
    // This is the raw, un-debounced search term as the user types.
    const [searchTerm, setSearchTerm] = useState(queryParams.search || '');
    const debouncedSearchTerm = useDebouncedValue<string>(searchTerm, 1000);

    // Keeps track of our current page in the 20-sized calls we make to the api
    const [page, setPage] = useState<number | undefined>(undefined);

    // This contains all of our stored and displayed (or scrolled off) card data
    const [state, dispatch] = useReducer(cardReducer, generateInitialState());

    // Don't flicker the empty item on first render for slow connections.
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            setTimeout(() => {
                isFirstRun.current = false;
            }, 500);
            return;
        }
    },[]);

    useEffect(() => {
        // The "changed" search term is the same as what was already searched for on the server side.
        if (isServerSearched.current) {
            isServerSearched.current = false;
            if (props.cards) {
                dispatch({ type: 'append', payload: { cards: props.cards, totalCount: props.totalCount } })
            }
            return;
        }

        // This resulted from a client-side change of the search bar, so we are doing a
        // new search and need to clear our old storage.
        dispatch({ type: 'clear' });
        setLoading(true);
        getCards(debouncedSearchTerm, undefined).then(response => {
            setLoading(false);
            setPage(undefined);
            dispatch({ type: 'append', payload: { cards: response.data.cards, totalCount: response.data._totalCount } })
        }, error => { console.log(error) });
    }, [debouncedSearchTerm]);

    // This handles altering the query terms so that search results can be easily shared.
    useEffect(() => {
        const queryUrl = makeQueryUrl(router.pathname, debouncedSearchTerm);
        router.push(queryUrl, undefined, { shallow: true })
    }, [debouncedSearchTerm])

    // Handler specifically for "load the next page of whatever we're currenly searching for."
    const handleLoadMore = () => {
        setLoading(true);
        const nextPage = page ? page + 1 : 2;
        getCards(debouncedSearchTerm, nextPage).then(
            response => {
                setLoading(false);
                setPage(nextPage);
                dispatch({ type: 'append', payload: { cards: response.data.cards, totalCount: response.data._totalCount } })
            }
        );
    }

    // All the magic of infinite scroll is handled with this hook.
    const infiniteScrollRef = useInfiniteScroll<HTMLDivElement>({
        loading,
        hasNextPage: state.currentCount < state.totalCount,
        onLoadMore: handleLoadMore,
        scrollContainer: 'window'
    });

    return (
        <Container maxWidth="md" className={classes.root} id="scrollingContainer" >
            <Link href="/">
                <Box component="div" display="flex" flexDirection="row" alignItems="center" >
                    <ArrowBackIcon />
                    <Typography variant="body2">Main Page</Typography>
                </Box>
            </Link>
            <TextField
                label="Card Name"
                id="standard-start-adornment"
                className={clsx(classes.margin, classes.textField)}
                InputProps={{
                    endAdornment: <InputAdornment position="end"><SearchIcon color="inherit" /></InputAdornment>,
                }}
                value={searchTerm || ''}
                onChange={(event) => { setSearchTerm(event.target.value) }}
            />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={3} ref={infiniteScrollRef}>
                {generateGridItems(!(isFirstRun.current && !debouncedSearchTerm) || loading, state.cards)}
            </Grid>
        </Container>
    );
}

// Make a call on the server side the first time that the page is loaded to reduce time to first render
PhotoGrid.getInitialProps = async (ctx) => {
    const queryParams = getQueryParameters(ctx.query);
    const response = await getCards(queryParams.search);

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
