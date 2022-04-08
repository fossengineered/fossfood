'use strict'

const DBcheck = require('../site-config/db-check')

function currentConfig(_, res) {
    DBcheck.verify((verify) => {
        res.status(200).json({ isDbConfigured: verify })
    })
}

module.exports = {
    currentConfig
}