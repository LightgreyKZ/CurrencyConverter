const myAPIkey = '8ec0aea8c4c4379b36b13671';

function SendRequest() {
    let url = `https://v6.exchangerate-api.com/v6/${myAPIkey}/latest/USD`
    //Запрашиваем данные с сервера
    fetch(url)
    .then((response) => 
            {console.log('Запрос успешен');
            return response.json(); //Преобразуем сырые данные и возвращаем их
        })
    .then(data => {   
        let ArrCodes = new Array;
        ArrCodes = Object.keys(data.conversion_rates);
        // console.log(ArrCodes);

        const SelectList1 = document.getElementById('select1');
        const SelectList2 = document.getElementById('select2');

        //Наполняем выпадающие списки кодами валют
        ArrCodes.forEach((item) => {
            // console.log(item);
            let option1 = createElem('option');//создаем элементы списка
            let option2 = createElem('option');
            option1.value = item;       //присваиваем value и само значение
            option1.innerHTML = item;
            option2.value = item;
            option2.innerHTML = item;
            // console.log(options.value);
            SelectList1.append(option1);//находим ему родителя :)
            SelectList2.append(option2);
        })
        }
        )
    .catch((error) => alert('API недоступно!!!'))
}

function createElem(typeElem) {
    const elem = document.createElement(typeElem);
    document.body.append(elem);
    return elem;
}

function GetConversion() {

//https://v6.exchangerate-api.com/v6/8ec0aea8c4c4379b36b13671/pair/USD/KZT

//Находим что выбрал пользователь
const selected1 = document.getElementById('select1');
const selected2 = document.getElementById('select2');
const options1 = selected1.options;
const options2 = selected2.options;

let currency1 = options1[selected1.selectedIndex].value;
let currency2 = options2[selected2.selectedIndex].value;


//формируем строку запроса
let url = `https://v6.exchangerate-api.com/v6/${myAPIkey}/pair/${currency1}/${currency2}`;

//Запрашиваем данные с сервера
fetch(url)
    .then(resp => {
            console.log('Успешно получили данные по паре валют');
            return resp.json();
        })
    .then(data => {
        console.log(data.conversion_rate);
        const amount = document.getElementById('amount');
        const total = document.getElementById('total_amount');
        total.innerHTML = data.conversion_rate * amount.value;
    })
    .catch((error) => { 
        console.error(error);
   
    });

}

SendRequest();
