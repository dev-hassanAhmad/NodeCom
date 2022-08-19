const mongoose = require('mongoose')



const connectWithDb = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log('db is connected'))
        .catch(error => { console.log('isses with Db connection', error) 
            process.exit(1)
    })
}

module.exports = connectWithDb