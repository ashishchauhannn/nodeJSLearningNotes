const mongoose = require('mongoose');
// const mongoURL = 'mongodb://localhost:27017/db';
const mongoURL = "mongodb://0.0.0.0:27017/mydb";
mongoose.connect(mongoURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    }
)
const db = mongoose.connection;
db.on('connected', () => {
    console.log("connected.....");
});
db.on('error', (err) => {
    console.log("error", err);
});
db.on('disconnected', () => {
    console.log("disonnected......");
});

module.exports = db;