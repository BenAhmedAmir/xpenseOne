module.exports = {
    _id: "_design/sheet",
    views: {
        list: {
            map: function (doc) {
                if (doc._id.startsWith('sheet:')) {
                    if (doc.orgId && doc.userId && !doc.archived)
                        emit([doc.orgId, doc.userId],
                            {
                                _id: doc._id, orgId: doc.orgId, userId: doc.userId, label: doc.label,
                                creationDate: doc.creationDate, submittedOn: doc.submittedOn,
                                status: doc.status, exported: doc.exported, total: doc.total,
                                approbations: doc.approbations
                            });
                }
            }.toString()
        }
    }
}