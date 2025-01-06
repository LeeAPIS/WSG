<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Math Worksheet Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        #worksheet {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
        }
        .column {
            display: flex;
            flex-direction: column;
            margin: 0 10px;
        }
        .problem {
            margin: 5px 0;
        }
        .controls {
            margin-bottom: 20px;
        }
        .controls label, .controls input, .controls select, .controls button {
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <h1>Math Worksheet Generator</h1>
    <div class="controls">
        <label for="min">Min:</label>
        <input type="number" id="min" value="1">
        
        <label for="max">Max:</label>
        <input type="number" id="max" value="12">
        
        <label for="operation">Operation:</label>
        <select id="operation">
            <option value="+">Addition</option>
            <option value="-">Subtraction</option>
            <option value="sub_positive">Subtraction (Positive Answers)</option>
            <option value="*">Multiplication</option>
            <option value="/">Division</option>
            <option value="add_sub">Addition + Subtraction</option>
            <option value="mul_div">Multiplication + Division</option>
            <option value="all">All</option>
        </select>
        
        <label for="count">Count:</label>
        <input type="number" id="count" value="120">
        
        <button id="generate">Generate Worksheet</button>
    </div>
    <div id="worksheet"></div>
    <script src="script.js"></script>
</body>
</html>
