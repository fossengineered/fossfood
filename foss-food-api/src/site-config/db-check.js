const fs = require('fs')
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const config = require('../config');
const { dirname, resolve } = require('path');
const { dbTables } = require('../db-setup/sqlite-tables')

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

    const db = await createDbConnection()

    const tables = await db.all(`
            select name from sqlite_master
                where type='table' and
                tbl_name in (${(dbTables.map(m=>`'${m.name}'`).join(','))})`)

    return Promise.resolve(tables.length !== dbTables.length ? null : dbTables.length)
}

const createDB = () => {
    const db = new sqlite3.Database(dbFile);
}

async function createTables() {
    const db = await createDbConnection()

    for (let i = 0; i < dbTables.length; i++) {
        res = await db.get(`select name from sqlite_master where type='table' and tbl_name=?`, dbTables[i].name)

        if (res) continue

        await db.run(dbTables[i].createSQL)
        console.log(`created ${dbTables[i].name}`)
    }
}

function createDbConnection() {
    return open({
        filename: dbFile,
        driver: sqlite3.Database
    });
}

module.exports = {
    dbFileExists,
    dbStatus,
    createDB,
    hasTables,
    createTables,
    createDbConnection
}