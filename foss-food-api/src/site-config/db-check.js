const fs = require('fs')
const sqlite3 = require('sqlite3');
const config = require('../config');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const dbFile = `${appDir}/${config.db}`


const dbFileExists = () => {
    return fs.existsSync(dbFile)
}

function hasTables(db, callback) {
    db.get('SELECT * FROM sqlite_master ', (err, row) => {
        if (err) { console.error(err); }

        callback(row != null)
    });
}

function verify(callback) {

    console.log(dbFile)

    if (!dbFileExists()) {
        callback(false)
        return
    }

    const db = new sqlite3.Database(dbFile);

    hasTables(db, (res) => {
        callback(res)
    })
}

module.exports = {
    verify
}