const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 420;
canvas.height = 420;

// Padding
var p = 10;

function drawBoard() {
    for (var x = 0; x < 400; x += 40) {
        ctx.moveTo(0.5 + x + p, p)
        ctx.lineTo(0.5 + x + p, 400 + p)
        ctx.moveTo(p, 0.5 + x + p)
        ctx.lineTo(400 + p, 0.5 + x + p)
    }

    ctx.strokeStyle = "black"
    ctx.stroke()
}


drawBoard();