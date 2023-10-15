'use strict';

const input1 = document.getElementById('input__box1');
const input2 = document.getElementById('input__box2');
const buttonReverse = document.getElementById("button__reverse");
const converter = document.getElementById('converter');
const arrOfInfo = document.getElementsByClassName('info');

let currencyValue1 = 'RUB';
let currencyValue2 = 'USD';

buttonReverse.onclick = () => {
    let a = input1.value;
    input1.value = input2.value;
    input2.value = a;
}

converter.onclick = e => {
    let target = e.target;
    let parentClass = target.parentElement.className;

    if (target.className === 'currency') {
        parentClass.includes('1') ? currencyValue1 = target.textContent : currencyValue2 = target.textContent;

        let elems = target.parentElement.querySelectorAll('.currency');

        for (let elem of elems) {
            elem.classList.remove('valid');
        }

        target.classList.add('valid');
    }
}

let timer = setInterval(() => {
    
    if (isNaN(parseInt(input1.value))) {
        for (let info of arrOfInfo) {
            info.textContent = 'Введено некоректное значение!';
        }
        return; 
    };

    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then((res) => res.json())
        .then((json) => {

            // throw new Error('whoops');

            let value1;
            let value2;

            currencyValue1 === 'RUB' ? value1 = 1 : value1 = json.Valute[`${currencyValue1}`].Value;

            currencyValue2 === 'RUB' ? value2 = 1 : value2 = json.Valute[`${currencyValue2}`].Value;
            
            input2.value = (parseInt(input1.value) * value1 / value2).toFixed(2);

            for (let info of arrOfInfo) {
                info.textContent = `${parseInt(input1.value)} ${currencyValue1} = ${input2.value} ${currencyValue2}`;
            }   
        })
        .catch((err) => {
            clearInterval(timer);
            alert(`Ошибка: ${err.name}. Попробуйте перезагрузить страницу или подключитесь позднее.`)
        });

}, 1000);