import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

interface Props {
    imageUrl?: string;
    name: string;
    setName: string;
    text: string;
    type: string;
}

const useStyles = makeStyles({
    root: {
        minHeight: 64,
        minWidth: 64,
        height: "100%",
    },
    media: {
        borderRadius: 24,
        minHeight: 256,
        padding: 8,
        minWidth: 256,
        objectFit: "contain"
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

const ElderCardDisplay: React.FC<Props> = ({ name, setName, text, type, imageUrl }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    return (
        <Card className={classes.root}>
            <CardContent>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={imageUrl}
                    onLoad={() => setLoading(false)}
                />
                {
                    loading && <LinearProgress color="secondary" />
                }
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
