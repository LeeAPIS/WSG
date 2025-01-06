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
    generatePDF(problems, operationName);
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

// Generate PDF with problems
function generatePDF(problems, operationName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text(operationName + " Practice", 105, 20, { align: "center" });

    // Set up for 4 columns
    const columns = 4;
    const margin = 10; // Margin from the edge
    const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin; // Width of the page minus margins
    const columnWidth = pageWidth / columns; // Width of each column
    const lineHeight = 10; // Space between lines
    let y = 30; // Starting y position

    problems.forEach((problem, index) => {
        // Calculate the x position based on the column
        const x = margin + (index % columns) * columnWidth; // Calculate x position for the current column

        // Check if we need to move to the next row
        if (index > 0 && index % columns === 0) {
            y += lineHeight; // Move down for the next row
            if (y > 280) { // Check if we need to add a new page
                doc.addPage();
                y = 20; // Reset y position for new page
            }
        }

        doc.text(problem, x, y); // Position the problem in the calculated x and y
    });

    // Save the PDF
    doc.save(`${operationName}_Worksheet.pdf`);
}
