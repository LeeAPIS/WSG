document.getElementById("worksheetForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const minValue = parseInt(document.getElementById("minValue").value);
    const maxValue = parseInt(document.getElementById("maxValue").value);
    const operation = document.getElementById("operation").value;

    // Limit the number of problems generated (for now 20)
    const problemsCount = 20; // Test with a smaller number of problems

    // Generate unique math problems
    const problems = generateUniqueProblems(minValue, maxValue, operation, problemsCount);

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

        if (op === "/") {
            // Ensure num1 is divisible by num2 for a whole-number result
            num2 = getRandomInt(min, max);
            if (num2 === 0) num2 = 1; // Prevent division by zero
            num1 = num2 * getRandomInt(min, max); // Ensure num1 is a multiple of num2
            problem = `${num1} ${op} ${num2} =`;
        } else {
            // Generate problems for other operations
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);
            problem = `${num1} ${op} ${num2} =`;
        }

        // Ensure uniqueness
        problems.add(problem);
    }

    return Array.from(problems); // Convert Set to Array
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
            return [operation]; // Single operation
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
