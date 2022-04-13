const canvas = document.getElementById("canvas") 
const ctx = canvas.getContext("2d")

var holes = 
    {
        "holeSpots":[
          {"slope": 1, "yInt": 5, "x1": 300, "y1": 0, "x2": 0, "y2": 300},
          {"slope": 4, "yInt": -2, "x1": 450, "y1": 0, "x2": 300, "y2": 600},
          {"slope": 5, "yInt": 5, "x1": 180, "y1": 0, "x2": 60, "y2": 600},
          {"slope": -2, "yInt": 4, "x1": 390, "y1": 600, "x2": 90, "y2": 0}
        ]
    }

console.log(holes.holeSpots[2].x1)

canvas.width = 600
canvas.height = 600

const centerWidth = canvas.width / 2
const centerHeight = canvas.height / 2

// Grid sidelength dimension
var sideLength = 600
var unit = 30

// Ball coordinates and slope
var dx = 1
var dy = -1
var blueBallX = centerWidth
var blueBallY = centerHeight
var redBallX = centerWidth
var redBallY = centerHeight

// Hole coordinates and slope + y-intercept
var holeTurn = 0
var blueHoleX
var blueHoleY
var redHoleX
var redHoleY
var holeSlope
var holeYInt

// Save the state of the empty grid with default slope line
var emptyGrid

// Function to create grid
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var x = 0; x <= sideLength; x += unit) {
        ctx.moveTo(0.5 + x, 0)
        ctx.lineTo(0.5 + x, sideLength)
        ctx.moveTo(0, 0.5 + x)
        ctx.lineTo(sideLength, 0.5 + x)
    }
    ctx.strokeStyle = "black"
    ctx.stroke()

    blueHoleX = holes.holeSpots[holeTurn].x1
    blueHoleY = holes.holeSpots[holeTurn].y1
    redHoleX = holes.holeSpots[holeTurn].x2
    redHoleY = holes.holeSpots[holeTurn].y2
    holeSlope = holes.holeSpots[holeTurn].slope
    holeYInt = holes.holeSpots[holeTurn].yInt
    holeTurn++
    if (holeTurn > 3) {
        holeTurn = 0
    }
    drawHole(blueHoleX, blueHoleY, "blue")
    drawHole(redHoleX, redHoleY, "red")

    emptyGrid = ctx.getImageData(0, 0, canvas.width, canvas.height)
    document.getElementById("slope").value = 1
    document.getElementById("showYInt").value = 0
    drawDefaultSlope()
}

drawBoard()



// Draw default slope lines (y = x)
function drawDefaultSlope() {
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
}




var currEquation = ctx.getImageData(0, 0, canvas.width, canvas.height)
// Sliders values for slope and y-intercept
var slopeSlider = document.getElementById("slope")
var yInterceptSlider = document.getElementById("y-intercept")

function showEquation() {
    document.getElementById("showSlope").innerHTML = slopeSlider.value
    document.getElementById("showYInt").innerHTML = yInterceptSlider.value
}


// Function to change line when either slider is updated
function changeLine() {
    calibrateSwing()
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

    currEquation = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
}

// Finding the y value for the ending point of the line
function findY1(slope) {
    return (slope * 1200) * -1 + 300
}
// Finding the y value for the starting point of the line
function findY2(slope) {
    return (slope * 1200) + 300
}



// Blue golf ball graphics
function drawBlueBall() {
    ctx.beginPath();
    ctx.arc(blueBallX, blueBallY, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();  
}
// Red golf ball graphics
function drawRedBall() {
    ctx.beginPath();
    ctx.arc(redBallX, redBallY, 10, 0, Math.PI*2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}
// Draw the next golf ball frame
function draw() {
    ctx.putImageData(emptyGrid, 0, 0)
    drawBlueBall()
    drawRedBall()
    blueBallX += dx;
    blueBallY += dy;
    redBallX -= dx;
    redBallY -= dy;
}

// Responds to button to put balls in motion
function startSwing() {
    calibrateSwing()
    let swung = setInterval(() => draw(), 10 + dy * dy)
    setTimeout(() => { clearInterval(swung), outcome() }, 4000);
}
// Changes the starting ball position and track angle based on slider fields
function calibrateSwing() {
    let x = centerWidth - yInterceptSlider.value * unit
    let y = centerHeight - yInterceptSlider.value * unit
    blueBallX = x
    blueBallY = y
    redBallX = x
    redBallY = y
    dy = slopeSlider.value * -1
}

// Creates the holes
function createHoles() {
    blueHoleX = holes.holeSpots[holeTurn].x1
    blueHoleY = holes.holeSpots[holeTurn].y1
    redHoleX = holes.holeSpots[holeTurn].x2
    redHoleY = holes.holeSpots[holeTurn].y2
    holeSlope = holes.holeSpots[holeTurn].slope
    holeYInt = holes.holeSpots[holeTurn].yInt
    holeTurn++
    if (holeTurn > 3) {
        holeTurn = 0
    }
    drawHole(blueHoleX, blueHoleY, "blue")
    drawHole(redHoleX, redHoleY, "red")
}

function drawHole(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke()
}

function outcome() {
    var message = ""
    if (slopeSlider.value == holeSlope && yInterceptSlider.value == holeYInt) {
        message = "Correct slope and y-intercept!"
    } else {
        message = "Not quite right... try again!"
    }
    alert(message)
    drawBoard()
}
