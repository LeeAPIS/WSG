document.getElementById("worksheetForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const minValue = parseInt(document.getElementById("minValue").value);
    const maxValue = parseInt(document.getElementById("maxValue").value);
    const operation = document.getElementById("operation").value;

    const problemsCount = 100; // Fixed at 100 problems

    // Generate unique math problems
    const problems = generateUniqueProblems(minValue, maxValue, operation, problemsCount);

    // Display problems in columns
    displayWorksheet(problems);
});

function generateUniqueProblems(min, max, operation, count) {
    const problems = new Set(); // Using Set to ensure uniqueness
    const operations = getOperations(operation);

    // Ensure that we generate at least 'count' problems
    while (problems.size < count) {
        let num1, num2, op, problem;

        // Randomly select an operation
        op = operations[Math.floor(Math.random() * operations.length)];

        // Handle different operations
        if (op === "/") {
            num2 = getRandomInt(min, max);
            if (num2 === 0) num2 = 1; // Prevent division by zero
            num1 = num2 * getRandomInt(min, max); // Make sure num1 is divisible by num2
            problem = `${num1} ${op} ${num2} =`;
        } else if (op === "-") {
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, num1); // Ensure no negative results for subtraction
            problem = `${num1} ${op} ${num2} =`;
        } else {
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);
            problem = `${num1} ${op} ${num2} =`;
        }

        // Add the generated problem to the set (only unique problems)
        problems.add(problem);
    }

    // Convert Set to Array and return
    return Array.from(problems);
}

function getOperations(operation) {
    switch (operation) {
        case "add_sub":
            return ["+", "-"];
        case "mul_div":
            return ["*", "/"];
        case "all":
            return ["+", "-", "*", "/"];
        default:
            return [operation];
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayWorksheet(problems) {
    const worksheetDiv = document.getElementById("worksheet");
    worksheetDiv.innerHTML = ""; // Clear previous content

    // Create 4 columns
    const columns = 4;
    const problemsPerColumn = Math.ceil(problems.length / columns);

    let htmlContent = '';

    for (let i = 0; i < columns; i++) {
        let columnHtml = `<div class="column">`;

        const columnProblems = problems.slice(i * problemsPerColumn, (i + 1) * problemsPerColumn);
        columnProblems.forEach(problem => {
            columnHtml += `<div class="problem">${problem}</div>`;
        });

        columnHtml += `</div>`;
        htmlContent += columnHtml;
    }

    worksheetDiv.innerHTML = htmlContent; // Single DOM update
}
