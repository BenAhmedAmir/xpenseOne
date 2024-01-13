module.exports = {
    _id: "_design/expt",
    views: {
        "list": {
            map: function (doc) {
                if (doc._id.startsWith('expt:')) {
                    emit(doc.orgId, { _id: doc._id, code: doc.code, type: doc.type, multiplicator: doc.multiplicator, i18n: doc.i18n });
                }
            }.toString()
        }
    }
}