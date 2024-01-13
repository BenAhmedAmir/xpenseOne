function AddUserMetadataToIdTokenClaims(user, context, callback) {
    const namespace = 'https://xpense-api.com';

    context.idToken[`${namespace}/user-metadata`] = user.user_metadata || {};
    callback(null, user, context);
}