document.getElementById("worksheetForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const minValue = parseInt(document.getElementById("minValue").value);
    const maxValue = parseInt(document.getElementById("maxValue").value);
    const operation = document.getElementById("operation").value;

    // Limit the number of problems to a smaller size to avoid freezing
    const problemsCount = 20; // Test with a smaller number of problems (20)

    // Generate unique math problems
    const problems = generateUniqueProblems(minValue, maxValue, operation, problemsCount);

    // Display problems in columns
    displayWorksheet(problems);
});

function generateUniqueProblems(min, max, operation, count) {
    const problems = [];
    const operations = getOperations(operation);

    // Limit the number of iterations to `count`
    while (problems.length < count) {
        let num1, num2, op, problem;

        op = operations[Math.floor(Math.random() * operations.length)];

        if (op === "/") {
            num2 = getRandomInt(min, max);
            if (num2 === 0) num2 = 1; // Prevent division by zero
            num1 = num2 * getRandomInt(min, max); // Ensure num1 is divisible by num2
            problem = `${num1} ${op} ${num2} =`;
        } else {
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);
            problem = `${num1} ${op} ${num2} =`;
        }

        // Ensure uniqueness by checking against existing problems
        if (!problems.includes(problem)) {
            problems.push(problem);
        }
    }

    return problems;
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
    worksheetDiv.innerHTML = ""; // Clear previous cont
