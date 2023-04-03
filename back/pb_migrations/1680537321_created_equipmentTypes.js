migrate((db) => {
  const collection = new Collection({
    "id": "c9owfwog6y8uiqg",
    "created": "2023-04-03 15:55:21.202Z",
    "updated": "2023-04-03 15:55:21.202Z",
    "name": "equipmentTypes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "javxaap8",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "rmegywwd",
        "name": "co2Weight",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("c9owfwog6y8uiqg");

  return dao.deleteCollection(collection);
})
