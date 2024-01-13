module.exports = {
    _id: "_design/tax",
    views: {
        "list": {
            map: function (doc) {
                if (doc._id.startsWith('tx:')) {
                    emit(doc.orgId, { _id: doc._id, orgId: doc.orgId, code: doc.code, defaultRate: doc.defaultRate, i18n: doc.i18n });
                }
            }.toString()
        }
    }
}