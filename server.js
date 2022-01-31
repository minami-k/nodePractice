require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
//const mongoConnect = require('./util/db-mongo').mongoConnect
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const articleRoute = require('./routes/article.route')
const authorRoute = require('./routes/author.route')
const userRoute = require('./routes/user.route') 

const User = require('./models/user.model')

const app = express()
const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: 'sessions'
})

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'thisIsSecretString',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use((req,res,next) => {
    console.log('auth: ', req.session.isLoggedIn);
    next()
})

app.use('/author', authorRoute)
app.use(articleRoute)
app.use(userRoute)


app.use((req,res,next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
})

const PORT = process.env.PORT || 8000

/* mongoConnect(() => {
    app.listen(PORT)
})
 */

mongoose.connect(process.env.MONGODB_URL, () => {
    app.listen(PORT)
})
