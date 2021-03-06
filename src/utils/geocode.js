const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2Fuaml2aHMiLCJhIjoiY2s4MWlhdmpzMGJiazNlcHF4enVvZ21seiJ9.ozcxpHCSE1bFQRkt7KHqpg&limit=1'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to get coordinates.!', { undefined });
        } else if (body.features.length === 0) {
            callback("Invalid request..", { undefined });
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });

        };
    });
};

module.exports = geocode;