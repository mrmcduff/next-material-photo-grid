import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { blueGrey } from '@material-ui/core/colors';

interface Props {
    imageUrl?: string;
    name: string;
    setName: string;
    text: string;
    type: string;
}

const useStyles = makeStyles({
    root: {

    },
    media: {
        height: 128,
        backgroundColor: blueGrey[100],
        // paddingTop: '56.25%', // 16:9
    },
    title: {
        fontSize: 14,
    },
    label: {
        fontWeight: 800,
    },
    pos: {
        marginBottom: 12,
    },
});

const ElderCardDisplay: React.FC<Props> = ({ name, setName, text, type }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <CardMedia className={classes.media} />
                <Typography variant="h5" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body1" component="span">
                    Set:{' '}
                </Typography>
                <Typography variant="body2" component="span">
                    {setName}<br />
                </Typography>
                <Typography variant="body1" component="span">
                    Type:{' '}
                </Typography>
                <Typography variant="body2" component="span">
                    {type}<br />
                </Typography>
                <Typography variant="body1" component="span">
                    Description:{' '}
                </Typography>
                <Typography variant="body2" component="span">
                    {text}<br />
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ElderCardDisplay;
