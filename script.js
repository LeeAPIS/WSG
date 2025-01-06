document.getElementById("worksheetForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const minValue = parseInt(document.getElementById("minValue").value);
    const maxValue = parseInt(document.getElementById("maxValue").value);
    const operation = document.getElementById("operation").value;

    // Generate unique math problems
    const problems = generateUniqueProblems(minValue, maxValue, operation, 120);

    // Display problems in columns
    displayWorksheet(problems);
});

function generateUniqueProblems(min, max, operation, count) {
    const problems = new Set();
    const operations = getOperations(operation);

    while (problems.size < count) {
        let num1, num2, op, problem;

        // Randomly select an operation if multiple are allowed
        op = operations[Math.floor(Math.random() * operations.length)];

        if (op === "÷") {
            // Ensure whole-number answers for division
            const divisor = getRandomInt(min, max);
            const quotient = getRandomInt(min, max);
            num1 = divisor * quotient;
            problem = `${num1} ${op} ${divisor} =`;
        } else if (op === "-" && operation === "sub_positive") {
            // Subtraction with positive answers only
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, num1); // num2 <= num1
            problem = `${num1} ${op} ${num2} =`;
        } else {
            // Generate problems for other operations (including subtraction with negative answers)
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);
            problem = `${num1} ${op} ${num2} =`;
        }

        // Ensure uniqueness
        problems.add(problem);
    }

    // Convert Set to Array
    return Array.from(problems);
}

function getOperations(operation) {
    switch (operation) {
        case "add_sub":
            return [" + ", " - "];
        case "mul_div":
            return [" x ", " ÷ "];
        case "all":
            return ["+ ", " - ", " x ", "÷"];
        case "sub_positive": // Specific handling for positive subtraction
            return [" - "];
        default:
            return [operation]; // Single operation or specific type
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

    for (let i = 0; i < columns; i++) {
        const columnDiv = document.createElement("div");
        columnDiv.className = "column";

        const columnProblems = problems.slice(i * problemsPerColumn, (i + 1) * problemsPerColumn);
        columnProblems.forEach(problem => {
            const problemDiv = document.createElement("div");
            problemDiv.className = "problem";
            problemDiv.textContent = problem;
            columnDiv.appendChild(problemDiv);
        });

        worksheetDiv.appendChild(columnDiv);
    }
}
