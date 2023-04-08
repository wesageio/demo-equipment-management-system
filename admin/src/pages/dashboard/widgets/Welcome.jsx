import * as React from 'react';
import { Box, Card, CardActions, Button, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../../../resources/logo.png'


const useStyles = makeStyles(theme => ({
    root: {
        background:
            theme.palette.type === 'dark'
                ? '#535353'
                : `linear-gradient(to right, #316532 0%, #3ba03f 35%), linear-gradient(to bottom, #489c52 0%, #6f4ceb 50%), #3f9a38`,

        color: '#fff',
        padding: 20,
        marginTop: theme.spacing(2),
        marginBottom: '1em',
    },
    media: {
        background: 'url("https://cdn.iconscout.com/icon/free/png-256/administrator-2166550-1836773.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        height: 'auto'
    },
    actions: {
        marginTop: '15px',
        [theme.breakpoints.down('md')]: {
            padding: 0,
            flexWrap: 'wrap',
            '& a': {
                marginTop: '1em',
                marginLeft: '0!important',
                marginRight: '1em',
            },
        },
    },
}));

export const Welcome = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Welcome to Wesage - Inventroy administration
                    </Typography>
                    <Box maxWidth="40em">
                        <Typography variant="body1" component="p" gutterBottom>
                            This is the admin of an equipment management system.
                        </Typography>
                    </Box>
                    <CardActions className={classes.actions}>
                        <Button
                            variant="contained"
                            href="http://wesage.io"
                            target="_blank"
                            style={{
                                background: 'linear-gradient(to right, #4b5857 0%, #639c94 35%), linear-gradient(to bottom, #489c52 0%, #6f4ceb 50%)',
                                color: 'white'
                            }}
                            startIcon={<Avatar src={Logo} />}
                        >
                            Wesage official site
                        </Button>
                    </CardActions>
                </Box>

                <Box
                    display={{ xs: 'none', sm: 'none', md: 'block' }}
                    className={classes.media}
                    width="16em"
                    height="9em"
                    overflow="hidden"
                />
            </Box>
        </Card>
    );
};
