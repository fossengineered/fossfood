'use strict'

const { getAllInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } = require('../inventory/domain')

const pause = () => {
    var waitTill = new Date(new Date().getTime() + 1 * 1000);
    while (waitTill > new Date()) { }
}

function items(_, res) {
    pause()
    getAllInventory(data => { res.status(200).json(data) })

}

function addItem({ body }, res) {
    pause()
    console.log(body)
    addInventoryItem(body, data => { res.status(200).json(data) })
}

function updateItem({ body, params }, res) {

    pause()

    if (body.id !== params.id) {
        res.status(500).json({ message: 'Provided id does not match this endpoint', details: 'Verify the item to be updated matches the submitted information' });
        return
    }

    updateInventoryItem(body, data => { res.status(200).json(data) })
}

function deleteItem({ params }, res) {

    pause()

    console.log(params.id)

    deleteInventoryItem(params.id, id => res.status(200).json({ message: 'OK' }))

}

module.exports = {
    items,
    addItem,
    updateItem,
    deleteItem
}