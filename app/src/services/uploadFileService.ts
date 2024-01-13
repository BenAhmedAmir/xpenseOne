import httpClient from '../utils/httpClient';

const uploadFile = (type: string, id: string, file, accessToken: string, serverConfig: { BACKEND_API_BASE_URL: string }) => {
    let formData = new FormData();

    formData.append("file", file);

    return httpClient.uploadFile({
        url: `${serverConfig.BACKEND_API_BASE_URL}/upload/${type}/${id}`,
        accessToken,
        payload: formData
    });

}

export {
    uploadFile
};