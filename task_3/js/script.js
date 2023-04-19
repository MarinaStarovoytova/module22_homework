const button = document.querySelector('.button');
const messageScreen = document.querySelector('.box-screen');
const messageGeo = document.querySelector('.box-geo');
const widthSreen = window.screen.width;
const heightSreen = window.screen.height;

const error = () => {
    messageGeo.textContent = 'Информация о местоположении недоступна';
  }

const success = (position) => {
    const { coords } = position;
    messageGeo.textContent = `Широта: ${coords.latitude} °, Долгота: ${coords.longitude} °`;
  }

button.addEventListener('click', () => {
    messageScreen.textContent = `Ширина вашего экрана: ${widthSreen} px, высота вашего экрана: ${heightSreen} px`;

    if(!navigator.geolocation) {
        messageGeo.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        messageGeo.textContent = 'Нажмите "разрешить", чтобы узнать местоположение';
        navigator.geolocation.getCurrentPosition(success, error);
    }

})