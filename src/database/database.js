const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true })
  .then(client => {
    return new Promise((resolve, reject) => {
      let db = client.db('ironfellowdb')
      resolve({ client, db })
    })
  })
  .then(pass => {
    return new Promise((resolve, reject) => {
      let { client, db } = pass
      let collection = db.collection('patientlist')
      resolve({ collection, client, db })
    })
  })
  .then(pass => {
    return new Promise((resolve, reject) => {
      let { collection, client, db } = pass
      collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
      ], (err, result) => {
        if (err) { reject(err) }
        console.log(result)
        resolve({ collection, client, db })
      })
    })
  })
  .then(pass => {
    let { client } = pass
    client.close()
  })
  .catch(err => { console.log(err) })
