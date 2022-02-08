const mongoose = require('mongoose');
const MONGOD_URI = 'mongodb://localhost:27017/team5'

mongoose.connection(MONGOD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


.then(instances => {
    console.log(`Connected to the db ${instances.connections[0].name}`);
})
.catch(err => console.log(`Connection failes`, err))

module.exports = mongoose