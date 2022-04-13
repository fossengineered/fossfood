'use strict'

const pause = () => {
    var waitTill = new Date(new Date().getTime() + 1 * 1000);
    while (waitTill > new Date()) { }
}

const DBcheck = require('../site-config/db-check')

function currentSettings(_, res) {

    pause()

    DBcheck.dbStatus((status) => {
        console.log(status)
        res.status(200).json(status)
    })
}

function createDB(_, res) {

    pause()

    if (DBcheck.dbFileExists()) {
        res.status(500).json({ message: 'DB Exists', details: 'Remove the existing db before invoking this operation' });
        return;
    }

    DBcheck.createDB()

    res.status(200).json({ message: 'OK' });
}

function createTables(_, res) {
    DBcheck.hasTables().then(dbRes => {
        if (dbRes != null) {
            res.status(500).json({ message: 'Tables Exist', details: 'Create a new DB before invoking this operation' });
            return;
        }

        DBcheck.createTables().then(() => {
            res.status(200).json({ message: 'OK' });
        })
    })
}

module.exports = {
    currentSettings,
    createDB,
    createTables
}