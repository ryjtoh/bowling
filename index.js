const canvas = document.getElementById("canvas") 
const ctx = canvas.getContext("2d")


canvas.width = 600
canvas.height = 600

const centerWidth = canvas.width / 2
const centerHeight = canvas.height / 2

// Grid sidelength dimension
var sideLength = 600
var unit = 30

// Function to create grid
function drawBoard() {
    for (var x = 0; x <= sideLength; x += unit) {
        ctx.moveTo(0.5 + x, 0)
        ctx.lineTo(0.5 + x, sideLength)
        ctx.moveTo(0, 0.5 + x)
        ctx.lineTo(sideLength, 0.5 + x)
    }

    ctx.strokeStyle = "black"
    ctx.stroke()
}

drawBoard()

// Save state of empty grid
var emptyGrid = ctx.getImageData(0, 0, canvas.width, canvas.height)

// Draw default slope lines (y = x)
ctx.beginPath()
ctx.moveTo(centerWidth, centerHeight)
ctx.lineTo(-900, 1500)
ctx.strokeStyle = "red"
ctx.stroke()
ctx.beginPath()
ctx.moveTo(centerWidth, centerHeight)
ctx.lineTo(1500, -900)
ctx.strokeStyle = "blue"
ctx.stroke()

// Sliders values for slope and y-intercept
var slopeSlider = document.getElementById("slope")
var yInterceptSlider = document.getElementById("y-intercept")

function showEquation() {
    document.getElementById("showSlope").innerHTML = slopeSlider.value
    document.getElementById("showYInt").innerHTML = yInterceptSlider.value
}


// Function to change line when either slider is updated
function changeLine() {
    showEquation()
    // Restore to empty grid
    ctx.putImageData(emptyGrid, 0, 0)
    // Gather slider values
    var slope = slopeSlider.value
    var yIntercept = yInterceptSlider.value * unit
    // Find endpoints of line
    var y1 = findY1(slope)
    var y2 = findY2(slope)

    // Draw blue
    ctx.beginPath()
    ctx.moveTo(centerWidth - yIntercept, centerHeight - yIntercept)
    ctx.lineTo(1500 - yIntercept, y1 - yIntercept)
    ctx.strokeStyle = "blue"
    ctx.stroke()
    // Draw red
    ctx.beginPath()
    ctx.moveTo(centerWidth - yIntercept, centerHeight - yIntercept)
    ctx.lineTo(-900 - yIntercept, y2 - yIntercept)
    ctx.strokeStyle = "red"
    ctx.stroke()
    
}

// Finding the y value for the ending point of the line
function findY1(slope) {
    return (slope * 1200) * -1 + 300
}
// Finding the y value for the starting point of the line
function findY2(slope) {
    return (slope * 1200) + 300
}

var currEquation = ctx.getImageData(0, 0, canvas.width, canvas.height)


ctx.beginPath();
ctx.arc(centerWidth, centerHeight, 10, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();

let dx = 2
let dy = -2
let blueBallX = centerWidth
let blueBallY = centerHeight
let redBallX = centerWidth
let redBallY = centerHeight

function drawBlueBall() {
    ctx.beginPath();
    ctx.arc(blueBallX, blueBallY, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();  
}

function drawRedBall() {
    ctx.beginPath();
    ctx.arc(redBallX, redBallY, 10, 0, Math.PI*2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.putImageData(currEquation, 0, 0)
    drawBlueBall()
    drawRedBall()
    blueBallX += dx;
    blueBallY += dy;
    redBallX -= dx;
    redBallY -= dy;
}

setInterval(draw, 15)