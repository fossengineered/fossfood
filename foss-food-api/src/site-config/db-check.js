const fs = require('fs')
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const config = require('../config');
const { dirname, resolve } = require('path');

const appDir = dirname(require.main.filename);
const dbFile = `${appDir}/${config.db}`


const dbFileExists = () => {
    return fs.existsSync(dbFile)
}

function dbStatus(callback) {

    if (!dbFileExists()) {
        callback({
            doesDbExist: dbFileExists(),
            hasTables: false,
            isSetupComplete: false
        })
    }

    hasTables().then(res => {
        callback({
            doesDbExist: true,
            hasTables: res != null,
            isSetupComplete: res != null
        })
    })
}

async function hasTables() {

    const db = await createDbConnection(dbFile)
    const row = await db.get(`select * from sqlite_master where type='table' and tbl_name='Inventory'`);

    return Promise.resolve(row)// != null
}

const createDB = () => {
    const db = new sqlite3.Database(dbFile);
}

async function createTables() {
    const db = await createDbConnection(dbFile)
    db.run(`CREATE TABLE Inventory(
        inventoryId INTEGER NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        quantity INTEGER NOT NULL
     );`).then(res => {
        Promise.resolve()
    })
}

function createDbConnection(filename) {
    return open({
        filename,
        driver: sqlite3.Database
    });
}

module.exports = {
    dbFileExists,
    dbStatus,
    createDB,
    hasTables,
    createTables
}