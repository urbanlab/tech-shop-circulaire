migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9btjzq6sv8l05f")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sot9jivf",
    "name": "type",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "c9owfwog6y8uiqg",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9btjzq6sv8l05f")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sot9jivf",
    "name": "type",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "c9owfwog6y8uiqg",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
