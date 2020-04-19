import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
// import { ParsedUrlQuery } from 'querystring';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ElderCardDisplay from '../components/ElderCardDisplay';
import { ElderCards } from '../interfaces/elderCard';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { API } from '../utils/constants';

interface Props {
    // initialQuery?: ParsedUrlQuery;
    // json?: object;
    // cards?: ElderCards;
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

const generateGridItems = (cards?: ElderCards): React.ReactNode => {
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

const makeQueryUrl = (
    pathName: string,
    page?: string | string[],
    search?: string | string[]): string => {
    const pageTerm = page ? `?page=${page}` : '';
    const searchTerm = search ? `${pageTerm ? '&' : '?'}search=${search}` : '';
    return `${pathName}${pageTerm}${searchTerm}`;
}


const PhotoGrid: NextPage<Props> = (_props) => {
    const router = useRouter();
    const classes = useStyles();

    let initialSearch = '';
    if (router.query.search && typeof router.query.search === 'string') {
        initialSearch = router.query.search as string;
    }
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState<React.ReactNode>(null);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const debouncedSearchTerm = useDebouncedValue<string>(searchTerm, 1000);

    // const [open, setOpen] = useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };

    useEffect(() => {
        setLoading(true);
        axios.get<ElderCards>(API, {
            params: {
                pageSize: 20,
                name: debouncedSearchTerm,
            }
        }).then(response => {
            setLoading(false);
            console.log(`using the search term: ${JSON.stringify(response.data)}`);
            setContents(generateGridItems(response.data));
        }, error => { console.log(error) });
    }, [debouncedSearchTerm]);

    console.log(`Current loading is ${loading}`);

    // if (!contents && !loading) {
    //     console.log('using the baked in version');
    //     setContents(generateGridItems(props.cards));
    // }

    useEffect(() => {
        const { page } = router.query;
        const queryUrl = makeQueryUrl(router.pathname, page, debouncedSearchTerm);
        console.log(makeQueryUrl(router.pathname, page, debouncedSearchTerm));
        router.push(queryUrl, undefined, { shallow: true })
        // router.push()
    }, [debouncedSearchTerm])

    console.log(`Router Query ${JSON.stringify(router.query)}`);
    console.log(`Router pathname ${JSON.stringify(router.pathname)}`);
    // console.log(`Page context query ${JSON.stringify(props.initialQuery)}`);

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
                {contents}
            </Grid>
        </Container>
    );
}

// PhotoGrid.getInitialProps = async (ctx) => {
//     const response = await axios.get<ElderCards>(API, {
//         params: {
//             pageSize: 20,
//         }
//     });

//     let cards;
//     if (response.status === 200) {
//         cards = response.data;
//     }
//     return {
//         initialQuery: ctx.query,
//         json: response.data,
//         cards,
//     }
// }

export default PhotoGrid;
