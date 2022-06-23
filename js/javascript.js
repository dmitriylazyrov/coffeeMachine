// /* Підключення функції для введення через консоль */
const input = require("readline-sync"); /* Для підключення, воддимо в терміналі npm install readline-sync */

/* Маисив з динамічною статистикою кавової машинки */
let coffee_machine = {
    water: 400,         /* Вода в машинці */
    milk: 540,          /* Молоко в машинці */
    beans: 120,         /* Кавові зерна в машинці */
    cups: 9,            /* Стаканчики в машинці */
    money: 550          /* Гроші в машинці */
};

/* Масив з умовно-постійною інформацією різних кав */
const type_coffee = {
    espresso: {         /* Експрессо дані для однієї чашки кави */
        water: 250,
        beans: 16,
        cups: 1,
        money: 4
    },
    latte: {            /* Латте дані для однієї чашки кави */
        water: 350,
        milk: 75,
        beans: 20,
        cups: 1,
        money: 7
    },
    cappuccino: {       /* Капучінно дані для однієї чашки кави */
        water: 200,
        milk: 100,
        beans: 12,
        cups: 1,
        money: 6
    }
};



/* ---------------- Головне виконання ---------------- */

/* Нескінченний цикл, для постійного ведення даних */
while (true) {
    console.log("Write action (buy, fill, take, remaining, exit):");
    let action = input.question("> ");          /* Введення команнди із 5-ти */

    switch (action.toLowerCase()) {                 /* Використання оператора switch, переводячи в нижній регістр */
        case "buy":                         /* Коли ввели команду buy викликається функція для введення даних */
            inputBuyCoffee();
            break;
        case "fill":                       /* Коли вибирається команда fill, викликається функці для додавання даних */
            inputFillCoffee();
            break;
        case "take":                       /* Команада take, викликаючи функцію, що отримує усі зароблені гроші */
            console.log();
            takeMoneyCoffeeMachine(coffee_machine);
            break;
        case "remaining":               /* Команда remaining, що викликає функцію, для відображення статистики машинки */
            console.log();
            coffeeStaticMachine(coffee_machine);
            console.log();

            break;
        case "exit":                   /* Вихід з програми */
            return;
        default:                       /* На випадок, якщо веденно щось не зрозуміле */
            console.log('Unknown input...\n');
    }
}


/* ------------------ ФУНКЦІЇ ------------------ */

/* Проста функція, що виводить всю статистику кавової машинки */
function coffeeStaticMachine(arr){
    console.log(`The coffee machine has:
${arr.water} ml of water
${arr.milk} ml of milk
${arr.beans} g of coffee beans
${arr.cups} disposable cups
$${arr.money} of money`);
}

/* Функція, що приймає два масиви, тип кави і кількість чашок замовлення */
function makeCoffee(arr1, arr2, value, amount){
    while (true) {
        console.log(`\nInput your money for pay from coffee (you have to pay $${amount * arr2[value].money}):`);
        let surrender;                              /* Змінна для нарахування залишку коштів */
        let total = amount * arr2[value].money;     /* Загальна сума, помноживиши кільеість на ціну певної кави */
        let pay_for_coffee = Number(input.question("> "));      /* Введення оплати */
        if (ifCorrectValue(pay_for_coffee) !== "") {                  /* Перевірка функцією, якщо буде не пусте значення */
            console.log('The amount money ' + ifCorrectValue(pay_for_coffee));  /* Виведення помилки, веденного числа */
        } else if (pay_for_coffee < total){                         /* Якщо введенна сума, меньша від суми до сплати */
            console.log(`You don't have enough $${total - pay_for_coffee}. Repeat please.`);  /* Помилка про недостачу */
        } else {
            for(let key in arr1){
                for(let i in arr2[value]){
                    /* Якщо ім'я одного масиву, рівне іншому наприклад water === water */
                    if(key === i){
                        /* Якщо в значення динамічного масива, меньше від постійного наприклад 200 < 250
                        * Але, якщо це ім'я не є money*/
                        if(arr1[key] < arr2[value][i] * amount && key !== "money"){
                            /* Повернення повідомлення про те, чого не вистачає, та повертаються гроші назад */
                            return `Sorry, not enough ${key}! Your surrender $${pay_for_coffee}!\n`;
                        } else if(key === "money"){                 /* Якщо ім'я є money */
                            surrender = pay_for_coffee - total;     /* Обрахунок остачі від введених коштів та оплати */
                            arr1[key] += pay_for_coffee - (surrender);  /* Додавання потрібної оплати, враховуючи остачу */
                        } else {
                            /* В інакшому випадку, зменьшення значеннь, певної кави, враховуючи їх кількість */
                            arr1[key] -= arr2[value][i] * amount;
                        }
                    }
                }
            }
            /* Повернення повідомлення про приготовану каву, та остачу з коштів */
            return `I have enough resources, making you a coffee! Your surrender $${surrender}\n`;
        }
    }
}

/* Функція, що приймає введенні значення для додавання в кавову машину */
function fillCoffeeMachine(arr, water, milk, beans, cups){
    for(let key in arr){
        /* Якщо ім'я має таке значення, то додається нове веденне */
        if(key === "water"){
            arr[key] += water;
        } else if(key === "milk"){
            arr[key] += milk;
        } else if(key === "beans"){
            arr[key] += beans;
        } else if(key === "cups"){
            arr[key] += cups;
        }
    }
}

/* Функція, що отримує масив статистики */
function takeMoneyCoffeeMachine(arr){
    for(let key in arr){
        /* Якщо ім'я є money */
        if(key === "money"){
            /* Зберігаємо в змінній дане значення */
            let money = arr[key];
            arr[key] -= money;      /* Вінімаємо це значення з масиву */
            console.log(`I gave you $${money}\n`);      /* Та виводимо гроші, котрі забрали */
        }
    }
}

/* Функція для введення даних, при додавання в кавову машину */
function inputFillCoffee(){
    while (true) {

        let give_water;
        let give_milk;
        let give_beans;
        let give_cups;

        console.log("\nWrite how many ml of water you want to add:");
        give_water = Number(input.question("> "));              /* Введення води */

        if(ifCorrectValue(give_water) !== ""){                        /* Перевірка функцією при помилці */
            console.log('The ml water ' + ifCorrectValue(give_water));
        } else {
            console.log("Write how many ml of milk you want to add:");
            give_milk = Number(input.question("> "));           /* Введення молока */
            if(ifCorrectValue(give_milk) !== ""){                     /* Перевірка функцією при помилці */
                console.log('The ml milk ' + ifCorrectValue(give_milk));
            } else {
                console.log("Write how many grams of coffee beans you want to add:");
                give_beans = Number(input.question("> "));      /* Введення кавових зерен */
                if(ifCorrectValue(give_beans) !== ""){                /* Перевірка функцією при помилці */
                    console.log('The g beans ' + ifCorrectValue(give_beans));
                } else {
                    console.log("Write how many disposable coffee cups you want to add:");
                    give_cups = Number(input.question("> "));   /* Введення чашок */
                    if(ifCorrectValue(give_cups) !== ""){             /* Перевірка функцією при помилці */
                        console.log('The amount cups ' + ifCorrectValue(give_cups));
                    } else {
                        /* Якщо усі введення правильні, то викликаємо функцію, для додавання в значення масиву */
                        console.log();
                        fillCoffeeMachine(coffee_machine, give_water, give_milk, give_beans, give_cups);
                        return;
                    }
                }
            }
        }
    }
}

/* Функція, що працює для введення даних при покупці */
function inputBuyCoffee(){
    while(true) {
        console.log("\nWhat do you want to buy? 1 - espresso ( $4 ), " +
            "2 - latte ( $7 ), 3 - cappuccino ( $6 ), back - to main menu:");
        let answer = (input.question("> ")).toLowerCase();          /* Вибір значення з меню */
        let when_coffee;                                                  /* Змінна для імені кави */

        if(answer === "back"){              /* Якщо введенно back, відразу завершуємо цикл */
            console.log();
            return;
        }
        console.log("\nWhat do you want amount cups coffee?");
        let count_coffee = Number(input.question("> "));        /* Введення кількості чашок кави */

        if(ifCorrectValue(count_coffee) !== ""){                    /* Перевірка функцією при помилці */
            console.log('The amount cups ' + ifCorrectValue(count_coffee));
        } else {
            if (answer === "1") {               /* Якщо espresso, викликаємо функцію, для покупки кави */
                when_coffee = "espresso";
                console.log(makeCoffee(coffee_machine, type_coffee, when_coffee, count_coffee));
                return;
            } else if (answer === "2") {        /* Якщо latte, викликаємо функцію, для покупки кави */
                when_coffee = "latte";
                console.log(makeCoffee(coffee_machine, type_coffee, when_coffee, count_coffee));
                return;
            } else if (answer === "3") {        /* Якщо cappuccino, викликаємо функцію, для покупки кави */
                when_coffee = "cappuccino";
                console.log(makeCoffee(coffee_machine, type_coffee, when_coffee, count_coffee));
                return;
            } else {                /* Якщо незрозуміле введення */
                console.log('Unknown input...\n');
            }
        }
    }
}

/* Функція, для перевірки введених значень */
function ifCorrectValue(value){
    /* Якщо меньше нуля, то повертає певне повідомлення */
    if(value < 0){
        return 'can not be less 0';
    } else if (isNaN(value)){           /* Якщо не є числом */
        return 'has to be a number';
    } else {                            /* Інакше повертає пусте значення */
        return "";
    }
}