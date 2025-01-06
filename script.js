// Generate unique problems based on user input
function generateUniqueProblems(min, max, operation, count) {
    const problems = new Set(); // Store unique problems
    const operations = getOperations(operation); // Allowed operations

    // Ensure valid inputs
    if (min > max) throw new Error("Invalid range: min should be <= max");

    while (problems.size < count) {
        let num1, num2, op, problem;

        // Randomly select an operation
        op = operations[Math.floor(Math.random() * operations.length)];

        if (op === "/") {
            // Division: Ensure whole-number results
            const divisor = getRandomInt(min, max);
            const quotient = getRandomInt(min, max);
            num1 = divisor * quotient; // Ensure num1 is divisible by divisor
            problem = `${num1} ${op} ${divisor} =`;
        } else if (operation === "sub_positive") {
            // Subtraction with positive answers only
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);

            // Ensure num1 >= num2 for positive results
            if (num1 < num2) [num1, num2] = [num2, num1];

            problem = `${num1} - ${num2} =`;
        } else {
            // Other operations
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);
            problem = `${num1} ${op} ${num2} =`;
        }

        // Add problem to the set if unique
        problems.add(problem);

        // Prevent infinite loop for too many problems
        if (problems.size === count) break;
        if (problems.size >= (max - min + 1) ** 2) {
            console.warn("Not enough unique problems possible for this range.");
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
        case "sub_positive": // Special case for positive subtraction
            return ["-"];
        default:
            return [operation]; // Single operation
    }
}

// Get a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Display the worksheet
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

// Add event listener to the Generate button
document.getElementById("generate").addEventListener("click", () => {
    const min = parseInt(document.getElementById("min").value, 10);
    const max = parseInt(document.getElementById("max").value, 10);
    const operation = document.getElementById("operation").value;
    const count = parseInt(document.getElementById("count").value, 10);

    try {
        const problems = generateUniqueProblems(min, max, operation, count);
        displayWorksheet(problems);
    } catch (error) {
        alert(error.message);
    }
});
