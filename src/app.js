const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// const serveIndex = require('serve-index')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tomislav A'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Tomislav A'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 
        
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            } 
            res.send({
                address: req.query.address,
                forecast: data,
                location
            })
        })

    })

    
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'I love when green people use blue ocean for black cover. It\'s easy mate, just set the city you want weather for.',
        title: 'Help',
        name: 'Tomislav A'
    })
})

// app.use('/public', express.static('src'))
// app.use('/public', serveIndex('src', {icons: true}))

app.get('/help/*', (req, res) => {
    res.render('404_help', {
        title: 'Error help',
        name: 'Tomislav A',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Tomislav A',
        errorMessage: 'Help not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

