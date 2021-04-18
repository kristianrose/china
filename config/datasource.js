const firebase = require('firebase')
let db = null
module.exports = app => {
    if (!db) {
        firebase.initializeApp(app.config)
        db = firebase.database()
        return db
    }
    return db
}