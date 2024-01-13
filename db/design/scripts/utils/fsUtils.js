const {join} = require('path');
const {readdir, stat} = require('fs-promise');

async function recursiveListFiles(dir, allFiles = []) {
  const files = (await readdir(dir)).map(f => join(dir, f))
  allFiles.push(...files)
  await Promise.all(files.map(async f => (
    (await stat(f)).isDirectory() && rreaddir(f, allFiles)
  )))
  return allFiles
}

module.exports = {
  recursiveListFiles
}