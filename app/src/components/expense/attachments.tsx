import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useAuth } from 'use-auth0-hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { uploadFile } from '../../services/uploadFileService';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { getExpense } from '../../services/expenseService';
import { Expense } from '../../models/expense';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

export const Attachments = ({
    expenseId, sheetId, config
}) => {
    const classes = useStyles();

    const { accessToken } = useAuth({
        audience: config.AUTH0_API_AUDIENCE,
        scope: 'openid email'
    });
    const [expense, setExpense] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const loadExpense = () => {
        if (!expense && accessToken) {
            getExpense(sheetId, expenseId, accessToken, config)
                .then((data: Expense[]) => {
                    return data
                })
                .then(setExpense);
        }
    }

    useEffect(() => {
        loadExpense();
    });

    const upload = () => {
        uploadFile('exp', expenseId, selectedFile, accessToken, config)
            .then((response) => {
                setSelectedFile(null)
                setExpense(null)
                loadExpense();
            })
            .catch(() => {
                setSelectedFile(undefined);
            });
    }

    const selectFile = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={3}>
                    <FormControl>
                        <label htmlFor="btn-upload">
                            <input id="btn-upload" name="btn-upload"
                                hidden type="file"
                                onChange={(file) => selectFile(file)} />
                            <Button
                                className="btn-choose" variant="outlined"
                                component="span" >
                                Choose File</Button>
                        </label>
                        <div className="file-name">
                            {selectedFile ? selectedFile.name : null}
                        </div>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        className="btn-upload" color="primary"
                        variant="contained" component="span"
                        disabled={!selectedFile}
                        onClick={() => upload()}>
                        Upload</Button>
                </Grid>
                <Grid item xs={6}>
                    <FormControl>
                        <List dense={true}>
                            {expense?.attachments.map((attachment, index) =>
                                <ListItem key={attachment.name}>
                                    <ListItemText primary={`#${index + 1}: ${attachment.originalName}`} />
                                </ListItem>
                            )}
                        </List>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}
