module.exports = {
  _id: "_design/org",
  views: {
    find: {
      map: function (doc) {
        if (doc._id.startsWith('org:')) {
          emit(doc._id, { _id: doc._id, name: doc.name, contact: doc.contact, status: doc.status });
        }
      }.toString()
    }
  },
  updates: {
    edit: function (doc, req) {
      if (!doc){
        // change nothing in database
        return [null, '404']
      }
      const requestBody = JSON.parse(req.body);
      const {name, contact: { name: contactName, phone, email}}  = requestBody;
      if(name) {
        doc['name'] = name;
      }
      if(contactName) {
        doc['contact']['name'] = contactName;
      }
      if(phone) {
        doc['contact']['phone'] = phone;
      }
      if(email) {
        doc['contact']['email'] = email;
      }
      return [doc, '200'];
    }
  }
}