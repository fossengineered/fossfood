const { createDbConnection } = require('../site-config/db-check')

async function repoGetItems(onComplete) {

    const db = await createDbConnection()

    const rows = await db.all('select inventoryId as id, name, description, quantity from Inventory')

    onComplete(rows)
}

async function repoAddItem(item, onComplete) {

    const db = await createDbConnection()

    const cursor = await db.run(`
    INSERT INTO [Inventory]
    (
    [name]
    ,[description]
    ,[quantity])
    VALUES
        (
        ?
        ,?
        ,?);`, [item.name, item.description, item.quantity])

    item.id = (await cursor).lastID

    onComplete([item])
}

async function repoUpdateItem(item, onComplete) {

    const db = await createDbConnection()

    const cursor = await db.run(`
    UPDATE [Inventory] 
        SET [name] = ?
            ,[description] = ?
            ,[quantity] = ?
        WHERE [inventoryId] = ?;`
        , [item.name, item.description, item.quantity, item.id])

    onComplete(item)
}

async function repoDeleteItem(id, onComplete) {

    const db = await createDbConnection()

    const cursor = await db.run(`
        DELETE FROM [Inventory]
            WHERE inventoryId = ?;`
        , [id])

    onComplete(id)
}

module.exports = {
    repoGetItems,
    repoAddItem,
    repoUpdateItem,
    repoDeleteItem
}