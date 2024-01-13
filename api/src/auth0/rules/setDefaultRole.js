function setDefaultRole(user, context, callback) {
    const ManagementClient = require('auth0@2.27.0').ManagementClient;

    const management = new ManagementClient({
        token: auth0.accessToken,
        domain: auth0.domain
    });

    const count = context.stats && context.stats.loginsCount ? context.stats.loginsCount : 0;
    if (count > 1) {
        return callback(null, user, context);
    }

    const params = { id: user.user_id };
    const data = { "roles": ["rol_a0ApH6m98OFalLC3"] };

    management.users.assignRoles(params, data, function (err, user) {
        if (err) {
            // Handle error.
            console.error(err);
        }
    });
    callback(null, user, context);
}