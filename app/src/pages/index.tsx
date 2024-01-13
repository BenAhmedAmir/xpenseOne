import * as React from 'react'
// import { Card, Col, Container, Row } from 'react-bootstrap'
import { getOrgs } from '../services/orgService';
import { useAuth, withLoginRequired } from 'use-auth0-hooks';
import Org from '../models/organization';
import { useState } from 'react';
import SheetsComponent from '../components/sheets';
import Layout from '../layouts/UserLayout';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Container} from '@material-ui/core';
import getServerRuntimeConfig from '../utils/getServerRuntimeConfig';
import {GetServerSideProps} from 'next';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props: { org: Org, accessToken, serverSideConfig }) {
    const { org, accessToken, serverSideConfig } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment key={org.id}>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {org.name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <SheetsComponent key={org.id} {...{ org, accessToken, config: serverSideConfig }} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const home = ({serverSideConfig}) => {
    const [orgs, setOrgs] = useState([]);
    const { isLoading, accessToken } = useAuth({
        audience: serverSideConfig.AUTH0_API_AUDIENCE,
        scope: 'openid email'
    });

    if (orgs.length == 0 && accessToken) {
        getOrgs(accessToken, serverSideConfig)
            .then((data: Org[]) => {
                return data;
            })
            .then(setOrgs);
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Organization name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orgs.map((org) => (
                        <Row key={org.id} {...{ org, accessToken, serverSideConfig }} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            serverSideConfig:  getServerRuntimeConfig()
        },
    }
}

home.layout = Layout;
// @ts-ignore

export default home;
// export default withLoginRequired(home);
