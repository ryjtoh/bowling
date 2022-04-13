const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.width = 620;
canvas.height = 620;

const centerWidth = canvas.width / 2;
const centerHeight = canvas.height / 2;

// Padding
var p = 10;
// Grid sidelength dimension
var sideLength = 600;

// Function to create grid
function drawBoard() {
    for (var x = 0; x <= sideLength; x += 30) {
        ctx.moveTo(0.5 + x + p, p)
        ctx.lineTo(0.5 + x + p, sideLength + p)
        ctx.moveTo(p, 0.5 + x + p)
        ctx.lineTo(sideLength + p, 0.5 + x + p)
    }

    ctx.strokeStyle = "black"
    ctx.stroke()
}

drawBoard();

// Save state of empty grid
var emptyGrid = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Slider for Slope
var slopeSlider = document.getElementById("slope");
var yInterceptSlider = document.getElementById("y-intercept")

function changeLine() {
    ctx.putImageData(emptyGrid, 0, 0)
    var point = slopeSlider.value;
    var point2 = yInterceptSlider.value;
    ctx.beginPath();
    ctx.moveTo(centerWidth, centerHeight);
    ctx.lineTo(point2 + 600, point + 600)
    ctx.strokeStyle = "black"
    ctx.stroke();
}




