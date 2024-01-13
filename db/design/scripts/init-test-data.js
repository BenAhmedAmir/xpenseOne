const fs = require('fs');
const util = require('util');
const path = require('path');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

const {createDBIfNotExists, updateDocument} = require('./utils/couchUtils');
const {recursiveListFiles} = require('./utils/fsUtils');
const {DH_NOT_SUITABLE_GENERATOR} = require('constants');

const initData = async () => {
  try {
    const db = await createDBIfNotExists()

    // Load core documents
    let files = await recursiveListFiles(path.join(__dirname, '..', 'core'))
      .then(files => files.filter(f => path.basename(f) == 'data.json'))

    
    // Pas de async ici pour avoir un log pertinent
    for (const file of files) {
      const records = await readFile(file)
        .then(JSON.parse)
      const deletes = records.map(async (rec) => {
        try {
          const doc = await db.get(rec._id)
          await db.destroy(doc._id, doc._rev)
        } catch (error) {
        }
      })
      await Promise.all(deletes)
      await db.bulk({docs: records})
      console.error('Documents imported', file)
    }

  } catch (e) {
    // Deal with the fact the chain failed
    console.error(e)
  }
}

(async () => {
  await initData();
})();
