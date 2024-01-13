function addRolesToAccessToken(user, context, callback) {
    const namespace = 'https://xpense-api.com';

    if (context.authorization && context.authorization.roles) {
        const assignedRoles = context.authorization.roles;

        if (context.accessToken) {
            const accessTokenClaims = context.accessToken;
            accessTokenClaims[`${namespace}/roles`] = assignedRoles;
            context.accessToken = accessTokenClaims;
        }
        if(context.idToken) {
            const idTokenClaims = context.idToken;
            idTokenClaims[`${namespace}/roles`] = assignedRoles;
            context.idToken = idTokenClaims;
        }
    }

    callback(null, user, context);
}