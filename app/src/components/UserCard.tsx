import User from "../models/user";
import {Card} from "react-bootstrap";
import * as React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';

const UserCard = (user: User) => {
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
            textAlign: 'center'
        },
        media: {
            height: 300,
        },
    });
    const classes = useStyles();
    return (

        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={user.picture}
                    title={user.nickname}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.nickname}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default UserCard;