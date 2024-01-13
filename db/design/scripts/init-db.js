const fs = require('fs');
const util = require('util');
const path = require('path');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

const { createDBIfNotExists, updateDocument } = require('./utils/couchUtils');
const { recursiveListFiles } = require('./utils/fsUtils');

const initCoreDocuments = async (db) => {
  // Load core documents
  let files = await recursiveListFiles(path.join(__dirname, '..', 'core'))
    .then(files => files.filter(f => f.endsWith('.json')))
    .then(files => files.filter(f => path.basename(f).startsWith('sys.')))

  // Pas de async ici pour avoir un log pertinent
  for (const file of files) {
    const content = await readFile(file)
    await updateDocument(db, JSON.parse(content))
  }
}

const initDesignDocuments = async (db) => {
  // Gestion des designs
  files = await recursiveListFiles(path.join(__dirname, '..', 'designs'))
    .then(files => files.filter(f => f.endsWith('.js')))

  // Pas de async ici pour avoir un log pertinent
  for (const file of files) {
    const obj = require(file);
    await updateDocument(db, obj)
  }
}

const initOrgDocuments = async (db) => {
  // Load org documents
  let files = await recursiveListFiles(path.join(__dirname, '..', 'org'))
      .then(files => files.filter(f => f.endsWith('.json')))
      .then(files => files.filter(f => path.basename(f).startsWith('org.')))

  // Pas de async ici pour avoir un log pertinent
  for (const file of files) {
    const content = await readFile(file)
    const collection =  JSON.parse(content);
    const promises = collection.map(object => updateDocument(db, object));
    Promise.all(promises).catch(error => console.error(`init org documents ${error}`))
  }
}

const initDB = async () => {
  try {
    const db = await createDBIfNotExists()

    // Load core documents
    await initCoreDocuments(db)
    await initDesignDocuments(db)
    await initOrgDocuments(db);

  } catch (e) {
    // Deal with the fact the chain failed
    console.error(e)
  }
}

(async () => {
  await initDB();
})();
