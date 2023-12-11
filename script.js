document.addEventListener("DOMContentLoaded", function () {
    const resultDisplay = document.querySelector(".result");
    const buttons = document.querySelectorAll(".buttons button");

    let currentInput = "";
    let operator = "";
    let firstOperand = "";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            handleButtonClick(button.innerText);
            updateDisplay();
        });
    });

    function handleButtonClick(value) {
        if (isNumber(value)) {
            currentInput += value;
        } else if (value === "," && !currentInput.includes(",")) {
            currentInput += value;
        } else if (isOperator(value)) {
            if (currentInput !== "") {
                if (firstOperand !== "") {
                    firstOperand = operate(firstOperand, currentInput, operator);
                    currentInput = "";
                } else {
                    firstOperand = currentInput;
                    currentInput = "";
                }
            }
            operator = value;
        } else if (value === "=") {
            if (currentInput !== "" && firstOperand !== "") {
                currentInput = operate(firstOperand, currentInput, operator);
                firstOperand = "";
                operator = "";
            }
        } else if (value === "C") {
            currentInput = "";
            firstOperand = "";
            operator = "";
        } else if (value === "±") {
            currentInput = negate(currentInput);
        } else if (value === "%") {
            currentInput = percentage(currentInput);
        }
    }

    function updateDisplay() {
        resultDisplay.innerText = currentInput || "0";
    }

    function isNumber(value) {
        return !isNaN(value) || value === ",";
    }

    function isOperator(value) {
        return ["+", "-", "x", "÷"].includes(value);
    }

    function operate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "x":
                return a * b;
            case "÷":
                if (b !== 0) {
                    return a / b;
                } else {
                    alert("Cannot divide by zero");
                    return "";
                }
            default:
                return "";
        }
    }

    function negate(value) {
        return value !== "" ? parseFloat(value) * -1 : "";
    }

    function percentage(value) {
        return value !== "" ? parseFloat(value) / 100 : "";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const modeButtons = document.querySelectorAll(".mode-buttons button");
    const body = document.body;

    modeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            toggleMode(button.id);
        });
    });

    function toggleMode(mode) {
        body.classList.remove("light-mode", "dark-mode");
        body.classList.add(mode);
    }
});

