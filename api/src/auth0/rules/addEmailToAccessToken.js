function addEmailToAccessToken(user, context, callback) {
    const namespace = 'https://xpense-api.com';
    context.accessToken[namespace + '/email'] = user.email;
    callback(null, user, context);
}