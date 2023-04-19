const button = document.querySelector('.button');
const messageTimezone = document.querySelector('.box-timezone');
const messageDateTimeTxt = document.querySelector('.box-date_time_txt');

const error = () => {
  // console.log('Информация о местоположении недоступна');
}

const success = (position) => {
  const { coords } = position;
  // console.log(`Широта: ${coords.latitude} °, Долгота: ${coords.longitude} °`);
  fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${coords.latitude}&long=${coords.longitude}`)
    .then((response) => { return response.json(); })
    .then((data) => {
      // console.log(data);
      const timezone = data;
      messageTimezone.textContent = `timezone: ${timezone.timezone}`;
      messageDateTimeTxt.textContent = `date_time_txt: ${timezone.date_time_txt}`;
    })
    .catch(() => { console.log('error'); })
}

button.addEventListener('click', () => {
  if (!navigator.geolocation) {
    messageGeo.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

})