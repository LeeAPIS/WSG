document.getElementById("generate").addEventListener("click", () => {
    const min = parseInt(document.getElementById("min").value, 10);
    const max = parseInt(document.getElementById("max").value, 10);
    const operation = document.getElementById("operation").value;
    const count = parseInt(document.getElementById("count").value, 10);

    if (isNaN(min) || isNaN(max) || isNaN(count) || min > max || count <= 0) {
        alert("Please enter valid inputs.");
        return;
    }

    const problems = generateProblems(min, max, operation, count);
    const operationName = getOperationName(operation);
    openWorksheetPage(problems, operationName);
});

// Generate unique math problems
function generateProblems(min, max, operation, count) {
    const problems = new Set();
    const operations = getOperations(operation);

    while (problems.size < count) {
        const op = operations[Math.floor(Math.random() * operations.length)];
        let num1, num2, problem;

        if (op === "/") {
            const divisor = getRandomInt(min, max);
            const quotient = getRandomInt(min, max);
            num1 = divisor * quotient;
            problem = `${num1} ${op} ${divisor} =`;
        } else if (operation === "sub_positive") {
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);
            if (num1 < num2) [num1, num2] = [num2, num1];
            problem = `${num1} - ${num2} =`;
        } else {
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);
            problem = `${num1} ${op} ${num2} =`;
        }

        problems.add(problem);
    }

    return Array.from(problems);
}

// Get allowed operations
function getOperations(operation) {
    switch (operation) {
        case "add_sub":
            return ["+", "-"];
        case "mul_div":
            return ["*", "/"];
        case "all":
            return ["+", "-", "*", "/"];
        case "sub_positive":
            return ["-"];
        default:
            return [operation];
    }
}

// Get operation name for the title
function getOperationName(operation) {
    switch (operation) {
        case "+":
            return "Addition";
        case "-":
            return "Subtraction";
        case "sub_positive":
            return "Subtraction (Positive)";
        case "*":
            return "Multiplication";
        case "/":
            return "Division";
        case "add_sub":
            return "Addition and Subtraction";
        case "mul_div":
            return "Multiplication and Division";
        case "all":
            return "All Operations";
        default:
            return "Math";
    }
}

// Generate a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Open a new page with the worksheet
function openWorksheetPage(problems, operationName) {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${operationName} Practice</title>
            <style>
                @media print {
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                }
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #fff;
                }
                h1 {
                    text-align: center;
                    font-size: 2em;
                    color: #333;
                    margin-bottom: 20px;
                }
                .worksheet {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }
                .problem {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 15px;
                    text-align: center;
                    background-color: #f9f9f9;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
            </style>
        </head>
        <body>
            <h1>${operationName} Practice</h
