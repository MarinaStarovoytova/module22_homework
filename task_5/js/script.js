const wsUrl = 'wss://echo-ws-service.herokuapp.com/';

const button = document.querySelector('.button');
const inputValue = document.querySelector('.input');
const chat = document.querySelector('.box-window-message');
const buttonGeo = document.querySelector('.button-geo');

inputValue.value = '';


function outputScreenClient(text) {
  inputValue.value = '';
  setTimeout(() => {
    const blockClient = document.createElement('div');
    blockClient.className ='blockClient';
    const div = document.createElement('div');
    div.innerHTML = text;
    div.className ='clientMessage';
    blockClient.appendChild(div);
    chat.appendChild(blockClient);
  }, 100)
} 

function outputScreenServer(text) {
  inputValue.value = '';
  setTimeout(() => {
    const blockServer = document.createElement('div');
    blockServer.className ='blockServer';
    const div = document.createElement('div');
    div.innerHTML = text;
    div.className ='serverMessage';
    blockServer.appendChild(div);
    chat.appendChild(blockServer);
  }, 2000)
}

button.addEventListener('click', function() {
    const websocket = new WebSocket(wsUrl);
    console.log('Статус соединения: ' + websocket.readyState);

    websocket.onopen = function() {
        console.log('Статус соединения: ' + websocket.readyState);
        websocket.send(inputValue.value);
        outputScreenClient(inputValue.value);
    }
    
    websocket.onmessage = function(event) {
        console.log(`Данные получены с сервера: ${event.data}`);
        outputScreenServer(event.data);
    }

    websocket.onclose = function(event) {
        if (event.wasClean) {
          console.log(`Соединение закрыто чисто, код = ${event.code} причина = ${event.reason}`);
        } else {
          console.log('Соединение прервано');
        }
      };
})

buttonGeo.addEventListener('click', function() {
  const websocket = new WebSocket(wsUrl);

  websocket.onopen = function() {
    console.log('Статус соединения: ' + websocket.readyState);
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        console.log(coords.latitude, coords.longitude);
        websocket.send(coords.latitude +' '+ coords.longitude);
      });
    }
}

websocket.onmessage = function(event) {
  console.log(`Данные получены с сервера: ${event.data}`);

  const blockServer = document.createElement('div');
  blockServer.className ='blockServer';
  chat.appendChild(blockServer); 

  const div = document.createElement('div');
  div.className ='serverMessage';
  blockServer.appendChild(div);

  const linkA = document.createElement('a');
  linkA.className = 'link-geo';
  linkA.innerHTML = 'Гео-локация';
  const linkGeo = 'https://www.openstreetmap.org/search?query=' + event.data;
  linkA.href = linkGeo;
  div.appendChild(linkA);                                                                   
}

websocket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`Соединение закрыто чисто, код = ${event.code} причина = ${event.reason}`);
  } else {
    console.log('Соединение прервано');
  }

}
})





