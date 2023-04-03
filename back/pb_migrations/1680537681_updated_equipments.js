migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9btjzq6sv8l05f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jw1aye7j",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "t4atwm0s4lgtecx",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9btjzq6sv8l05f")

  // remove
  collection.schema.removeField("jw1aye7j")

  return dao.saveCollection(collection)
})
