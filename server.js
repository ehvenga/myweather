const express = require('express')
const app = express()
const expHbs = require('express-handlebars')

const port = process.env.PORT || 5000
const homeRouter = require('./routes/home')

app.engine('hbs', expHbs({ extname:'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

app.use('/', homeRouter)

app.listen(port, () => {
    console.log(`Server Started | Port : ${port}`);
})