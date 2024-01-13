import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import getServerRuntimeConfig from '../utils/getServerRuntimeConfig';
import PageChange from "../template/components/PageChange/PageChange.js";
import "../template/assets/css/nextjs-material-dashboard.css?v=1.0.0";
import {Auth0Provider} from 'use-auth0-hooks';

Router.events.on("routeChangeStart", (url) => {
    console.log(`Loading: ${url}`);
    document.body.classList.add("body-page-transition");
    ReactDOM.render(
        <PageChange path={url} />,
        document.getElementById("page-transition")
    );
});
Router.events.on("routeChangeComplete", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
    componentDidMount() {
        let comment = document.createComment(`

=========================================================
* * NextJS Material Dashboard v1.0.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
        document.insertBefore(comment, document.documentElement);
    }
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps : { ... pageProps, config:  getServerRuntimeConfig()}};
    }

    render() {
        const {Component, pageProps: propsWithConfig, router} = this.props;
        const {config, ...pageProps} = propsWithConfig;
        
        const onRedirectCallback = appState => {
            console.log('appState', appState)
            router.push(appState && appState.targetUrl ? appState.targetUrl : '/')
        }
        // @ts-ignore
        const Layout = Component.layout || (({ children }) => <>{children}</>);
        return (
            <Auth0Provider
                domain={ config.AUTH0_DOMAIN }
                clientId={ config.AUTH0_CLIENT_ID }
                clientSecret={ config.AUTH0_CLIENT_SECRET }
                redirectUri={ config.AUTH0_CLIENT_REDIRECT_URI }
                onRedirectCallback={ onRedirectCallback }
                audience={ config.AUTH0_API_AUDIENCE }
            >
                <React.Fragment>
                    <Head>
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, shrink-to-fit=no"
                        />
                        <title>Xpense App</title>
                    </Head>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </React.Fragment>
            </Auth0Provider>

        );
    }
}
