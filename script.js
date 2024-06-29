document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('button');
    const display = document.querySelector('.calculator-display');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';
    let result = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (value === 'AC') {
                currentInput = '';
                operator = '';
                firstOperand = '';
                secondOperand = '';
                result = '';
                display.value = '';
                return;
            }

            if (value === '=') {
                if (firstOperand && operator && currentInput) {
                    secondOperand = currentInput;
                    try {
                        if (['sin', 'cos', 'tan'].includes(operator)) {
                            result = Math[operator](parseFloat(firstOperand) * (Math.PI / 180)).toFixed(10); // Convert to radians
                        } else if (operator === '^2') {
                            result = Math.pow(parseFloat(firstOperand), 2);
                        } else {
                            result = eval(`${firstOperand} ${operator} ${secondOperand}`);
                        }
                        display.value = result;
                        currentInput = result;
                        firstOperand = '';
                        secondOperand = '';
                        operator = '';
                    } catch (error) {
                        display.value = 'Error';
                        currentInput = '';
                        operator = '';
                        firstOperand = '';
                        secondOperand = '';
                    }
                }
                return;
            }

            if (['+', '-', '*', '/', '%', 'sin', 'cos', 'tan', '^2', '(', ')'].includes(value)) {
                if (value === 'sin' || value === 'cos' || value === 'tan' || value === '^2') {
                    firstOperand = currentInput;
                    operator = value;
                    if (value === '^2') {
                        display.value = `${firstOperand}²`;
                    } else {
                        display.value = `${value}(${firstOperand})`;
                    }
                    currentInput = '';
                } else {
                    firstOperand = currentInput;
                    operator = value;
                    currentInput = '';
                }
                return;
            }

            currentInput += value;
            display.value = currentInput;
        });
    });
});
