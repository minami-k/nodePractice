require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
//const mongoConnect = require('./util/db-mongo').mongoConnect
const mongoose = require('mongoose')

const articleRoute = require('./routes/article.route')
const authorRoute = require('./routes/author.route')
const User = require('./models/user.model')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

//dummy authentification flow
/* 
app.use((req,res,next) => {
    const user = new User('admin', 'minamikoma24@gmail.com')
    user.save().then(result => {
        console.log(result);
        next()
    }).catch(err => console.log(err))

    //login
    User.findById('61f43a440aa89fa93ffbd44d')
    .then(user => {
        console.log(user);
        req.user = user
        next()
    })
    .catch(err => console.log(err))
}) */

app.use('/author', authorRoute)
app.use(articleRoute)

app.use((req,res,next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
})

const PORT = process.env.PORT || 8000

/* mongoConnect(() => {
    app.listen(PORT)
})
 */

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
})
.then(() => {
    app.listen(PORT)
})
.catch(err => console.log(err))

