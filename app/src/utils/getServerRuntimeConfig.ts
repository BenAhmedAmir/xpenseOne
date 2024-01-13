import getConfig from 'next/config';

export default () => {
    const { serverRuntimeConfig } = getConfig();
    return serverRuntimeConfig;
}
