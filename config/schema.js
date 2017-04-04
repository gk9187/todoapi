var dynamoose = require('dynamoose');

var Schema = dynamoose.Schema;

var todoSchema = new Schema({
  id: {
    type: String,
    hashKey: true
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  state: {
    type: Boolean,
  },
},
{
  throughput: {read: 15, write: 5}
});

module.exports = todoSchema; 
