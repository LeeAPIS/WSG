function generateUniqueProblems(min, max, operation, count) {
    const problems = new Set();
    const operations = getOperations(operation);

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
            // Subtraction with positive answers only
            num1 = getRandomInt(min, max);
            num2 = getRandomInt(min, max);

            // Ensure num1 >= num2
            if (num1 < num2) [num1, num2] = [num2, num1];

            problem = `${num1} - ${num2} =`;
        } else {
            // Generate problems for other operations
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
