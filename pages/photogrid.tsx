import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ElderCardDisplay from '../components/ElderCardDisplay';

interface Props {
    initialQuery?: ParsedUrlQuery;
    userAgent?: string;
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
            width: '25ch',
        },
    }),
);

const generateGridItem = ({ name, setName, text, type }: {
    name: string;
    setName: string;
    text: string;
    type: string;
}) => {
    return <ElderCardDisplay
        name={name}
        setName={setName}
        text={text}
        type={type} />
}

const PhotoGrid: NextPage<Props> = (props) => {
    const router = useRouter();
    const classes = useStyles();
    console.log(`Router Query ${JSON.stringify(router.query)}`);
    console.log(`Page context query ${JSON.stringify(props.initialQuery)}`);
    console.log(props.userAgent);

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
                <Grid item xs={6} sm={3}>
                    {generateGridItem(
                        {
                            name: 'foo',
                            setName: 'fooSet',
                            text: 'fooText',
                            type: 'fooType'
                        })
                    }
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

PhotoGrid.getInitialProps = async (ctx) => {
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
    return {
        initialQuery: ctx.query,
        userAgent
    }
}

export default PhotoGrid;
