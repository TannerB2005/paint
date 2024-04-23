const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let size = Number(document.getElementById('size').textContent);
let isPressed = false
let color = document.getElementById('color').value;
let erase = 'white'
let x
let y

// erases and puts paint where cursor is

canvas.addEventListener('mousedown', (e) => {
    isPressed = true

    x = e.offsetX
    y = e.offsetY
}) 

canvas.addEventListener('mouseup', (e) => {
    isPressed = false

    x = undefined
    y = undefined
}) 

canvas.addEventListener('mousemove', (e) => {
    if(isPressed && !e.shiftKey) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
    else e.shiftKey
}) 


canvas.addEventListener('mousemove', (e) => {
    if(e.shiftKey && isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        eraseCircle(x2, y2)
        eraseLine(x, y, x2, y2)

        x = x2
        y = y2
    }
    else isPressed
}) 

// This tracks where it is, and applies the paint

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    color = document.getElementById('color').value;
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    color = document.getElementById('color').value;
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}

// Additional Content! I also changed the let statements, color statments, and added &&, and else statements

// Below will erase what you write

function eraseCircle(x,y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = erase
    ctx.fill()
}

function eraseLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = erase
    ctx.lineWidth = size * 2
    ctx.stroke()
}

// Below will increase and decrease size

const minus = document.getElementById('decrease');

minus.onclick = decrementSize;

function decrementSize() {
    size -= 1;
    document.getElementById('size').textContent = size;
}

const add = document.getElementById('increase');

add.onclick = incrementSize;

function incrementSize(){
    size += 1;
    document.getElementById('size').textContent = size;
}


// This will clear the canvas, instead of the window. 
// This allows you to keep your current font size and selected color.

const clearButton = document.getElementById("clear");

clearButton.onclick = clear;

function clear() {
    ctx.beginPath();
    ctx.arc(0, 0, 1500, 0, Math.PI * 2);
    color = '#f5f5f5';
    ctx.fillStyle = color;
    ctx.fill();
}