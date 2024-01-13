import Head from 'next/head';
import * as React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import {Container} from '@material-ui/core';
import { CssBaseline } from '@material-ui/core'

const UserLayout = props => (
    <React.Fragment>
        <Head>
            <title>Xpense APP</title>
        </Head>
        <CssBaseline />
        <Navbar/>
        <Container>{props.children}</Container>

    </React.Fragment>
);

export default UserLayout;