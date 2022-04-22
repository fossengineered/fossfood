const { repoGetItems, repoAddItem, repoUpdateItem, repoDeleteItem } = require('./sqlite-repo')

function getAllInventory(onComplete) {
    repoGetItems(rows => {
        onComplete(rows)
    })
}

function addInventoryItem(item, onComplete) {
    repoAddItem(item, onComplete)
}

function updateInventoryItem(item, onComplete) {
    repoUpdateItem(item, onComplete)
}

function deleteInventoryItem(id, onComplete) {
    repoDeleteItem(id, onComplete)
}

module.exports = {
    getAllInventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
}