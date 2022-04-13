'use strict'

const DBcheck = require('../site-config/db-check')

function currentConfig(_, res) {
    DBcheck.dbStatus((status) => {
        res.status(200).json({ isDbConfigured: status.isSetupComplete })
    })
}

module.exports = {
    currentConfig
}