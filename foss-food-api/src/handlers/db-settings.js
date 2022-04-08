'use strict'

const DBcheck = require('../site-config/db-check')

function currentSettings(_, res) {
    
    var waitTill = new Date(new Date().getTime() + 1 * 1000);
    while(waitTill > new Date()){}

    DBcheck.verify((verify) => {
        res.status(200).json({ doesDbExist: verify })
    })
}

module.exports = {
    currentSettings
}