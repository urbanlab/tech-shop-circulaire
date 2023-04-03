migrate((db) => {
  const collection = new Collection({
    "id": "t4atwm0s4lgtecx",
    "created": "2023-04-03 16:00:41.815Z",
    "updated": "2023-04-03 16:00:41.815Z",
    "name": "rentHistory",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rfypmnet",
        "name": "startDate",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "1grzfecc",
        "name": "stopDate",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "ipxtjwb7",
        "name": "borrowerMail",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "xjlklweg",
        "name": "borrowerStructure",
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
  const collection = dao.findCollectionByNameOrId("t4atwm0s4lgtecx");

  return dao.deleteCollection(collection);
})
