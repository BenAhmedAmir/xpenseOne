module.exports = {
  _id: "_design/currency",
  views: {
    list: {
      map: function (doc) {
        if (doc._id === 'sys:currencies'){
          doc.currencies.forEach(currency => {
            const {i18n: {fr, en}} = currency;
            emit(
                currency.code,
                { code: currency.code, format: currency.format, nameFR: fr.name, nameEN: en.name });
          })
        }
      }.toString()
    }
  }
}