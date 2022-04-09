const fs = require('fs')
const sqlite3 = require('sqlite3');
const config = require('../config');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const dbFile = `${appDir}/${config.db}`


const dbFileExists = () => {
    return fs.existsSync(dbFile)
}

const dbStatus = () => {
    const status = {
        doesDbExist: dbFileExists()
    }

    status.isSetupComplete = status.doesDbExist

    return status
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

const createDB = () => {
    const db = new sqlite3.Database(dbFile);
}

module.exports = {
    verify,
    dbFileExists,
    dbStatus,
    createDB
}