const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://Khaledy:tetraplumbato2@cluster0.rxgad.mongodb.net/Blogmer?retryWrites=true&w=majority', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
//articles.js route
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createAt: 'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter) 

app.listen('3333')
