var manageCanvas_drawCanvas = document.querySelector("#drawCanvas");

var drawing = false;

var before_x = 0;
var before_y = 0;

var ctx = manageCanvas_drawCanvas.getContext("2d");

var loadedImg;

manageCanvas_drawCanvas.addEventListener("mousemove", drawCanvas);

manageCanvas_drawCanvas.addEventListener("mousedown", function (e) {
    drawing = true;
    var rect = e.target.getBoundingClientRect();
    before_x = e.clientX - rect.left;
    before_y = e.clientY - rect.top;
});

manageCanvas_drawCanvas.addEventListener("mouseup", function () {
    drawing = false;
});

function drawCanvas(e) {
    if (!drawing) {
        return
    }

    if (document.querySelector("#thicknessPicker") == null || document.querySelector("#colorPicker") == null) {
        return
    }
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var w = document.querySelector("#thicknessPicker").value;
    var color = document.querySelector("#colorPicker").value;
    var r = parseInt(color.substring(1, 3), 16);
    var g = parseInt(color.substring(3, 5), 16);
    var b = parseInt(color.substring(5, 7), 16);

    ctx.lineCap = "round";
    ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(before_x, before_y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    before_x = x;
    before_y = y;
}

function Tool(btnNum) {
    if (btnNum == 1) {
        ctx.globalCompositeOperation = "source-over";
        document.getElementById("pencilBtn").className = "active";
        document.getElementById("eraserBtn").className = "";
    }
    else if (btnNum == 2) {
        ctx.globalCompositeOperation = "destination-out";
        document.getElementById("pencilBtn").className = "";
        document.getElementById("eraserBtn").className = "active";
    }
}

function init() {
    manageCanvas_drawCanvas.width = screen.width;
    manageCanvas_drawCanvas.height = screen.height;
    manageCanvas_drawCanvas = manageCanvas_drawCanvas.getContext("2d");
}
init();