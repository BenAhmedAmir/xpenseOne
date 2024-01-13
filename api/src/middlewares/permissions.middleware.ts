const jwtAuthz = require("express-jwt-authz");

const checkPermissions = (permissions: string[], checkAllScopes = true) => {
    return jwtAuthz(permissions, {
        customScopeKey: "permissions",
        checkAllScopes,
        failWithError: true
    });
};

export default checkPermissions;
