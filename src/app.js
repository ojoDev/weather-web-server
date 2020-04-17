
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Create express application
const app = express()  // by default in 3000 port (local)
const port = process.env.PORT || 3000 // Heroku environment variable for PORT or 3000 by default

// Paths for Express config
const publicPath = path.join(__dirname, '../public') // For static content
const viewsPath = path.join(__dirname, '../templates/views') // By default is '/views'
const partialsPath = path.join(__dirname, '../templates/partials')

// Dynamic content (hbs)
app.set('view engine', 'hbs') //Set up hbs (handle bars for Express)
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

 // Express use static content in publicPath
app.use(express.static(publicPath))


app.get('', (req, res) => { // Use views/index.hbs
    res.render('index', {
        title: 'Weather App',
        author: 'Ojodev'
    })
})

app.get('/about', (req, res) => { // request and response for help page
    res.render('about', {
        title: 'About me',
        author: 'Ojodev'
    }) 
})

app.get('/help', (req, res) => { 
    res.render('help', {
        title: 'Help page',
        author: 'Ojodev'
    }) 
})


app.get('/weather', (req, res) => { 
    if (!req.query.address) {
        return res.send( {
            error: "You must provide a 'address' query param"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, placename} = {}) => {
        if (error) {
            return res.send( {
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send( {
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: placename,
                address: req.query.address
            }) 
        })
    })

})


app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: "You must provide a 'search' query param"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        error: 'Help topic not found',
    }) 
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        error: 'Page not found',
    }) 
})

app.listen(port, () => {
    console.log('Server is up in port '+ port)
}) // run the server

