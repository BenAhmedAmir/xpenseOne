module.exports = {
    _id: "_design/exp",
    views: {
        "by-sheet": {
            map: function (doc) {
                if (doc._id.startsWith('exp:') && doc.sheetId) {
                    emit(doc.sheetId, {
                        _id: doc._id, sheetId: doc.sheetId, type: doc.type, source: doc.source, date: doc.date,
                        amount: doc.amount, attachments: doc.attachments, comments: doc.comments
                    });
                }
            }.toString()
        }
    },
    updates: {
        "add-attachment": function (doc, req) {
            if (!doc) {
                return [null, '404']
            }

            const { name, originalName } = JSON.parse(req.body);

            doc.attachments.push({
                name: name,
                originalName: originalName
            });

            return [doc, '200'];
        },
        upsert: function (doc, req) {
            const requestBody = JSON.parse(req.body);
            if (!doc) {
                if ('id' in req && req['id']) {
                    // create new document
                    const { source, sheetId } = requestBody;
                    return [
                        {
                            '_id': req['id'],
                            'source': source,
                            'sheetId': sheetId
                        }, '200']
                }
                // change nothing in database
                return [null, 'No doc provided']
            }

            const { date, type, source, amount, currency, tax, taxAmount } = requestBody;

            if (date) {
                doc['date'] = date;
            }
            if (type) {
                doc['type'] = type;
            }
            if (source) {
                doc['source'] = source;
            }
            if (amount) {
                doc['amount']['value'] = amount;
            }
            if (currency) {
                doc['amount']['curr'] = currency;
            }
            if (tax) {
                doc['amount']['tax']['id'] = tax;
            }
            if (taxAmount) {
                doc['amount']['tax']['amount'] = taxAmount;
            }
            return [doc, '200']
        }
    }
}