'use strict'

const DBcheck = require('../site-config/db-check')

function currentSettings(_, res) {

    var waitTill = new Date(new Date().getTime() + 1 * 1000);
    while (waitTill > new Date()) { }

    const status = DBcheck.dbStatus();
    console.log(status)
    res.status(200).json(status)
}

function createDB(_, res) {

    var waitTill = new Date(new Date().getTime() + 1 * 1000);
    while (waitTill > new Date()) { }

    if (DBcheck.dbFileExists()) {
        res.status(500).json({ message: 'DB Exists', details: 'Remove the existing db before invoking this operation' });
        return;
    }

    DBcheck.createDB()

    res.status(200).json({ message: 'OK' });
}

module.exports = {
    currentSettings,
    createDB
}