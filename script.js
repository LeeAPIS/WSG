function generateUniqueProblems(min, max, operation, count) {
    const problems = new Set();
    const operations = getOperations(operation);

    // Precompute valid subtraction problems for sub_positive
    let subPositivePairs = [];
    if (operation === "sub_positive") {
        for (let i = min; i <= max; i++) {
            for (let j = min; j <= i; j++) {
                subPositivePairs.push([i, j]);
            }
        }
    }

    while (problems.size < count) {
        let num1, num2, op, problem;

        // Randomly select an operation if multiple are allowed
        op = operations[Math.floor(Math.random() * operations.length)];

        if (op === "/") {
            // Ensure whole-number answers for division
            const divisor = getRandomInt(min, max);
            const quotient = getRandomInt(min, max);
            num1 = divisor * quotient;
            problem = `${num1} ${op} ${divisor} =`;
        } else if (operation === "sub_positive") {
            // Pick a random pair from precomputed positive subtraction pairs
            const pairIndex = getRandomInt(0, subPositivePairs.length - 1);
            [num1, num2] = subPositivePairs[pairIndex];
            problem = `${num1} - ${num2} =`;

            // Remove used pair to prevent duplicates
            subPositivePairs.splice(pairIndex, 1);
        } else {
            // Generate problems for other operations
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);
            problem = `${num1} ${op} ${num2} =`;
        }

        // Ensure uniqueness
        problems.add(problem);

        // Prevent infinite loop if we've exhausted possible problems
        if (operation === "sub_positive" && subPositivePairs.length === 0) break;
    }

    // Convert Set to Array
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
        case "sub_positive": // Specific handling for positive subtraction
            return ["-"];
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
