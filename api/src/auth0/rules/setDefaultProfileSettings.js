function setDefaultProfileSettings(user, context, callback) {
    const ManagementClient = require('auth0@2.27.0').ManagementClient;

    const management = new ManagementClient({
        token: auth0.accessToken,
        domain: auth0.domain
    });

    const is_social = context.connectionStrategy === context.connection;
    // if it is the first login (hence the `signup`) and it is a social login
    if (context.stats.loginsCount === 1 && is_social) {
        const params = { id: user.user_id };
        const user_metadata = {
            preferredLang: 'en', defaultCurrencyId: 'CAD', phoneNumber: '',
            organizations: []
        };
        management.updateUserMetadata(params, user_metadata, function (err, user) {
            if (err) {
                console.error(err);
            }
            callback(err, user, context);
        });
    }
    callback(null, user, context);
}