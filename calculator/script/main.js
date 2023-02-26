const input = document.getElementById('input');
const buttonDelete = document.getElementById('buttonDelete');
const buttonClearAll = document.getElementById('buttonClearAll');
const operatorPlusMinus = document.getElementById('operatorPlusMinus');
const operatorEquals = document.getElementById('operatorEquals')

let strInput = "";
let currentInput = "";
const numbersArray = new Array ();

const userInput = (number) => {
    if (strInput.length === 9 ) {
        return input.value
    } else if (strInput.includes('.')) {
        if (number.innerHTML === '.') {
            return input.value
        } else {       
            strInput = strInput + number.innerHTML
            input.value = strInput
            return input.value
        }
    } else {        
        strInput = strInput + number.innerHTML
        input.value = strInput
        return input.value
    };
};

document.querySelectorAll('#number').forEach(number => {
    number.addEventListener('click', () => {userInput(number)})})

const whichOperator = (operator) => {
    let currentOperator;
    if (numbersArray.length > 0 && strInput != "" && operator != "="){
        result = eval(`${numbersArray[0]}${operator}${strInput}`)
        numbersArray[0] = result;
        input.value = result;
        currentOperator = operator;
    } else if (numbersArray.length > 0 && strInput != "" && operator === "="){
        console.log(currentOperator)
        result = eval(`${numbersArray[0]}${currentOperator}${strInput}`)
        numbersArray[0] = result;
        input.value = result;
    }
    if (strInput != "") {
        numbersArray.push(strInput)
    }
    currentInput = `${input.value}${operator}`
    strInput = ""
}

operatorEquals.addEventListener('click', () => {
    let operator = currentInput.at(-1)
    let lastInput = currentInput.slice(0,-1)
    result = eval(`${lastInput}${operator}${strInput}`)
    input.value = result;
    currentInput = input.value
    numbersArray[0] = input.value
    strInput = ""
})

document.querySelectorAll('#operator').forEach(operator => {
    operator.addEventListener('click', () => {whichOperator(operator.innerHTML)})})

buttonDelete.addEventListener('click', () => {
    strInput = strInput.slice(0, -1)
    input.value = strInput
})

buttonClearAll.addEventListener('click', () => {
    strInput = ""
    while (numbersArray.length > 0) {
        numbersArray.pop();
    }
    input.value = strInput
})

operatorPlusMinus.addEventListener('click', () => {   
    if (!strInput.startsWith('-')) {
        strInput = `-${strInput}`;
        input.value = strInput;
    } else {
        strInput = strInput.substring(1);
        input.value = strInput;
    }
});
