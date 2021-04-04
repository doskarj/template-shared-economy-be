import { MongoClient } from 'mongodb'
import { config } from '../config/mongoDb'

const mongoConfig = config['development'];

MongoClient.connect(mongoConfig.url, (err, client) => {
  const db = client.db('itemsDb');

  db.collection('items').insertMany([
    {
      itemId: 1,
      name: 'Item 01'
    },
    {
      itemId: 2,
      name: 'Item 02'
    }
  ]).then(response => {
    console.log(response);
    client.close();
  }).catch(err => {
    console.log(err);
  });
});