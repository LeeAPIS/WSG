// Generate unique problems based on user input
function generateProblems(min, max, operation, count) {
    const problems = new Set();
    const operations = getOperations(operation);

    while (problems.size < count) {
        const op = operations[Math.floor(Math.random() * operations.length)];
        let num1, num2, problem;

        if (op === "/") {
            // Division: Ensure whole-number results
            const divisor = getRandomInt(min, max);
            const quotient = getRandomInt(min, max);
            num1 = divisor * quotient;
            problem = `${num1} ${op} ${divisor} =`;
        } else if (operation === "sub_positive") {
            // Subtraction with positive answers only
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

        // Break if it's impossible to generate more unique problems
        if (problems.size >= (max - min + 1) ** 2) {
            console.warn("Reached the limit of unique problems for the range provided.");
            break;
        }
    }

    return Array.from(problems);
}

// Get operations based on user selection
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

// Get a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Display the worksheet in a 4-column format
function displayWorksheet(problems) {
    const worksheetDiv = document.getElementById("worksheet");
    worksheetDiv.innerHTML = "";

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

// Add event listener for the Generate button
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
    displayWorksheet(problems);
});
