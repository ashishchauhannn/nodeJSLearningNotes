const mongoose = require('mongoose');
// const mongoURL = 'mongodb://localhost:27017/db';
// const mongoURL = "mongodb://0.0.0.0:27017/mydb";
const mongoURL = "mongodb+srv://ashishchauhannn:redmi.65@cluster0.viqsw5z.mongodb.net/";
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
    console.log("there is an error", err);
});
db.on('disconnected', () => {
    console.log("disconnected......");
});

module.exports = db;