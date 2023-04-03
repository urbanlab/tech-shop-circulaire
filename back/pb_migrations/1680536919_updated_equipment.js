migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9btjzq6sv8l05f")

  collection.name = "equipments"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "urvp86sv",
    "name": "desc",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "znvfyeul",
    "name": "reference",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3l7tqlic",
    "name": "date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rssrs2mv",
    "name": "tips",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "stja4msm",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/vnd.mozilla.apng",
        "image/jpeg",
        "image/jpx",
        "image/webp"
      ],
      "thumbs": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "it5kkerq",
    "name": "purchaseCost",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9btjzq6sv8l05f")

  collection.name = "equipment"

  // remove
  collection.schema.removeField("urvp86sv")

  // remove
  collection.schema.removeField("znvfyeul")

  // remove
  collection.schema.removeField("3l7tqlic")

  // remove
  collection.schema.removeField("rssrs2mv")

  // remove
  collection.schema.removeField("stja4msm")

  // remove
  collection.schema.removeField("it5kkerq")

  return dao.saveCollection(collection)
})
