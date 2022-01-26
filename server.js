const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoConnect = require('./util/db-mongo').mongoConnect
const expressLayouts = require('express-ejs-layouts')

const articleRoute = require('./routes/article.route')
/* const adminRoute = require('./routes/admin.route')
 */
const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

/* app.use('/admin', adminRoute)
 */
app.use(articleRoute)

//For layouts
app.use(expressLayouts)
//app.use('layout', './layouts/main')

const PORT = process.env.PORT || 8000

mongoConnect(() => {
    app.listen(PORT)
})


