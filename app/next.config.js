const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");


require('dotenv').config()

const {
    AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET,
    AUTH0_CLIENT_REDIRECT_URI, AUTH0_API_AUDIENCE, BACKEND_API_BASE_URL
} = process.env;

module.exports = withPlugins([[withSass], [withImages], [withCSS]], {
    serverRuntimeConfig: {
        AUTH0_DOMAIN,
        AUTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET,
        AUTH0_CLIENT_REDIRECT_URI,
        AUTH0_API_AUDIENCE,
        BACKEND_API_BASE_URL
    },
    //getting values to client side
    env: {},
    rewrites: function () {
        return [
            {
                source: '/api/:slug*',
                destination: 'http://localhost:7000/api/:slug*', // Matched parameters can be used in the destination
            },
        ]
    }
});