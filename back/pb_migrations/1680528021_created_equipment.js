migrate((db) => {
  const collection = new Collection({
    "id": "h9btjzq6sv8l05f",
    "created": "2023-04-03 13:20:21.026Z",
    "updated": "2023-04-03 13:20:21.026Z",
    "name": "equipment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ndkoz0yz",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("h9btjzq6sv8l05f");

  return dao.deleteCollection(collection);
})
