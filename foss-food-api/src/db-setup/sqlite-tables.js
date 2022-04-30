const dbTables = [{
    name: "Inventory",
    createSQL: `CREATE TABLE Inventory(
        inventoryId INTEGER NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        quantity INTEGER NOT NULL
     );`
},
{
    name: "Recipes",
    createSQL: `CREATE TABLE [Recipes] (
        [recipeId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
      , [name] text NOT NULL
      );`
},
{
    name: 'RecipesInventory',
    createSQL: `CREATE TABLE [RecipesInventory] (
        [recipeInventoryId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
      , [fk_inventoryId] INTEGER NOT NULL
      , [fk_recipeId] INTEGER NOT NULL
      );`
}]

module.exports = {
    dbTables
}

