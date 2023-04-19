const button = document.querySelector('.button');
const buttonIcon_1 = document.querySelector('.button_icon_1');
const buttonIcon_2 = document.querySelector('.button_icon_2');
let flag = true;


button.addEventListener('click', () => {
    if (flag) {
        buttonIcon_1.style.display = 'none';
        buttonIcon_2.style.display = 'block';
        flag = false;
    } else {
        buttonIcon_2.style.display = 'none';
        buttonIcon_1.style.display = 'block';
        flag = true;
    }
});



 
