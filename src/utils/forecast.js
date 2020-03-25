const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a310003567d1282d12961dbb4e4b03f0/' + latitude + ',' + longitude + '?units=si';
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to hit weather service!!', { undefined });
        } else if (body.error) {
            callback(body.error, { undefined });
        } else {
            callback(undefined, body);
        }
    });
};

module.exports = forecast;