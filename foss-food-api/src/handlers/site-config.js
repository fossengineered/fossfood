'use strict'

const DBcheck = require('../site-config/db-check')

function currentConfig(_, res) {
    res.status(200).json({ isDbConfigured: DBcheck.dbStatus().isSetupComplete })
}

module.exports = {
    currentConfig
}