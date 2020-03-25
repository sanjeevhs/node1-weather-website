const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#msg1');
const message2 = document.querySelector('#msg2');

message1.textContent = '';
message2.textContent = '';

weatherForm.addEventListener('submit', (subeve) => {

    subeve.preventDefault();

    fetch('http://127.0.0.1:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = 'It is currently '+data.temperature
                +' degrees out. There is a '+data.precipProbability+' chance of rain.';
            }
        });

    });

});