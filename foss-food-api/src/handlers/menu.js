'use strict'

function item({ params }, res) {
    res.status(200).json({ id: params.id, name: "get item", description: "this is some text to describe the item" })
}

function items(_, res) {
    res.status(200).json([{ id: 1, name: "item 1" }])
}

module.exports = {
    items, item
}