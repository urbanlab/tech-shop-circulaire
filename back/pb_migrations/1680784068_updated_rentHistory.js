migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t4atwm0s4lgtecx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v9pz6l93",
    "name": "borrowerName",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t4atwm0s4lgtecx")

  // remove
  collection.schema.removeField("v9pz6l93")

  return dao.saveCollection(collection)
})
