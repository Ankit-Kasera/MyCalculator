const form = document.querySelector('form');
const questionBox = document.querySelector('#question');
const answerBox = document.querySelector('#answer');


form.addEventListener('click', processCalculation)
let equation = ''

function processCalculation(event) {
    const targetClass = event.target.classList[0];
    const isLastOperator = isOperator(equation);

    const value = event.target?.dataset?.value ||  event.target.value;

    const isCurrentValueOperator =  isOperator(value ?? '');
    console.log("is last operator", isLastOperator)
    if(['opr', 'operator'].includes(targetClass)) {
       
       if(isCurrentValueOperator && isLastOperator) return

        equation += value;
        questionBox.textContent = equation;

    }

  else  if(targetClass === 'reset') {
        equation = '';
        questionBox.textContent = equation;
        answerBox.textContent = equation;
    }

    else if(targetClass === 'back') {
        equation = equation.slice(0, equation.length - 1)
        questionBox.textContent = equation;
    }

    else if(targetClass === 'result') {
        try {
            equation = eval(equation.trim())
            answerBox.textContent = '=' + equation;
        }
        catch(err) {
            console.log(err)
            answerBox.textContent = 'Error';
            equation = '';
        }
    }
}

function isOperator (equation = '') {
    const lastChar = equation.toString().charAt(equation.length - 1)
    return ['+', '-', '*', '/', '%'].includes(lastChar)

}
