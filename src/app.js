const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Config express directories
const publicDir = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname, '../templates/partials');

// Set paths to serve files 
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialpath);

// To serve static files 
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sanjeev HS'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App:',
        name: 'Sanjeev H S'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Customer helpline : ',
        name: 'Sanjeev'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide a address"
        });
    };

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            // return res.render('error', {
            //     errorMessage: error
            // });
            console.log("1st Error: \n"+error);
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                // return res.render('error', {
                //     errorMessage: error.error,
                //     errorCode: error.code
                // });
                console.log("2nd Error: \n"+error);
                return res.send({
                    error: error.error,
                    code: error.code
                });
            }
            res.send({
                location: location,
                temperature: forecastData.currently.temperature,
                precipProbability: forecastData.currently.precipProbability+' %'
                
            });
            // res.render('index', {
            //     location: "Address : "+req.query.address,
            //     temperature: "Temperature : "+forecastData.currently.temperature,
            //     rain_expectation: "Rain percentage : "+forecastData.currently.precipProbability+' %'
            // });
        });
    });

});

app.get('/products', (req, res) => {
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Help article not found',
        name: 'Sanjeev HS'
    });
});
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'About article not found',
        name: 'Sanjeev HS'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page Not Found',
        name: 'Sanjeev'
    });
});

app.listen(port, () => {
    console.log("server is up on 3000");
});