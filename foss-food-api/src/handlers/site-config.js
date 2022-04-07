'use strict'

function currentConfig(_, res) {
    res.status(200).json({ isDbConfigured: true })
}

module.exports = {
    currentConfig
}