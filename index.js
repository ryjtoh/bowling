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

ctx.beginPath()
    ctx.moveTo(1500 - 30, -900 - 30)
    ctx.lineTo(-900, 1500)
    ctx.strokeStyle = "black"
    ctx.stroke()




// Sliders for slope and y-intercept
var slopeSlider = document.getElementById("slope")
var yInterceptSlider = document.getElementById("y-intercept")
// Function to change line when either slider is updated
function changeLine() {
    // Restore to empty grid
    ctx.putImageData(emptyGrid, 0, 0)
    // Gather slider values
    var slope = slopeSlider.value
    console.log("slope: " + slope)
    var yIntercept = yInterceptSlider.value * unit
    console.log("y - intercept: " + yIntercept)
    // Find endpoints of line
    var y1 = findY1(slope)
    var y2 = findY2(slope)

    // Draw lines
    ctx.beginPath()
    ctx.moveTo(centerWidth - yIntercept, centerHeight - yIntercept)
    ctx.lineTo(1500 - yIntercept, y1 - yIntercept)
    ctx.strokeStyle = "black"
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerWidth - yIntercept, centerHeight - yIntercept)
    ctx.lineTo(-900 - yIntercept, y2 - yIntercept)
    ctx.strokeStyle = "black"
    ctx.stroke()
    
}

// Finding the starting coor
function findY1(slope) {
    return (slope * 1200) * -1 + 300
}

function findY2(slope) {
    return (slope * 1200) + 300
}



