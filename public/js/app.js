const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#msg1');
const message2 = document.querySelector('#msg2');

message1.textContent = 'Loading..';
message2.textContent = '';

weatherForm.addEventListener('submit', (subeve) => {

    subeve.preventDefault();

    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
                message2.textContent = '';
            } else {
                message1.textContent = data.location;
                message2.textContent = 'It is currently '+data.temperature
                +' degrees out. There is a '+data.precipProbability+' chance of rain. And also humidity is '
                +data.humidity+' %, wind speed is '+data.windspeed+' kmph.';
            }
        });

    });

});