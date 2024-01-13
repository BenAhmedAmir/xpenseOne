/**
@param {object} user - The user being created
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.password - user's password
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} context - Auth0 connection and other context info
@param {string} context.renderlanguage - language used by signup flow
@param {string} context.request.ip - ip address
@param {string} context.request.language - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
module.exports = function (user, context, cb) {
    var response = {};

    response.user = user;
    response.user.user_metadata = {
        preferredLang: 'en', defaultCurrencyId: 'CAD', phoneNumber: '',
        organizations: []
    };
    // Add user or app metadata to the newly created user
    // response.user.user_metadata = { foo: 'bar' };
    // response.user.app_metadata = { vip: true, score: 7 };

    // Deny the user's registration and send a localized message to New Universal Login
    // if (denyRegistration) {
    //    const LOCALIZED_MESSAGES = {
    //      en: 'You are not allowed to register.',
    //      es: 'No tienes permitido registrarte.'
    //    };
    //
    //    const localizedMessage = LOCALIZED_MESSAGES[context.renderLanguage] || LOCALIZED_MESSAGES['en'];
    //    return cb(new PreUserRegistrationError('Denied user registration in Pre User Registration Hook', localizedMessage));
    // }

    cb(null, response);
};
