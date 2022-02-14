const manageCanvas_drawCanvas = document.querySelector("#drawCanvas");
var ctx = manageCanvas_drawCanvas.getContext("2d");

var drawing = false;
var beforeXCord = 0;
var beforeYCord = 0;

function startDrawing(event) {
    drawing = true;
    var rect = event.target.getBoundingClientRect();
    if (event.offsetX != null && event.offsetY != null) {
        beforeXCord = event.offsetX;
        beforeYCord = event.offsetY;
    }
    else {
        beforeXCord = event.changedTouches[0].clientX - rect.left;
        beforeYCord = event.changedTouches[0].clientY - rect.top;
    }
}

function stopDrawing(event) {
    drawing = false;
}

function drawCanvas(event) {
    if (!drawing) {
        return
    }

    if (document.querySelector("#thicknessPicker") == null || document.querySelector("#colorPicker") == null) {
        showAlert("그림도구 요소를 찾을수 없습니다", "warning");
        return
    }

    var rect = event.target.getBoundingClientRect();
    var thicknessPickerValue = document.querySelector("#thicknessPicker").value;
    var colorPickerValue = document.querySelector("#colorPicker").value;
    var redColor = parseInt(colorPickerValue.substring(1, 3), 16);
    var greenColor = parseInt(colorPickerValue.substring(3, 5), 16);
    var blueColor = parseInt(colorPickerValue.substring(5, 7), 16);
    var nowXCord;
    var nowYCord;
    if (event.offsetX != null && event.offsetY != null) {
        nowXCord = event.offsetX;
        nowYCord = event.offsetY;
    }
    else {
        nowXCord = event.changedTouches[0].clientX - rect.left;
        nowYCord = event.changedTouches[0].clientY - rect.top;
    }

    ctx.lineCap = "round";
    ctx.strokeStyle = "rgb(" + redColor + "," + greenColor + "," + blueColor + ")";
    ctx.lineWidth = thicknessPickerValue;
    ctx.beginPath();
    ctx.moveTo(beforeXCord, beforeYCord);
    ctx.lineTo(nowXCord, nowYCord);
    ctx.stroke();
    ctx.closePath();

    beforeXCord = nowXCord;
    beforeYCord = nowYCord;
}

function changeDrawingTool(btnNum) {
    if (btnNum == 1) {
        ctx.globalCompositeOperation = "source-over";
        document.getElementById("pencilBtn").classList.add("active");
        document.getElementById("eraserBtn").classList.remove("active");
    }
    else if (btnNum == 2) {
        ctx.globalCompositeOperation = "destination-out";
        document.getElementById("pencilBtn").classList.remove("active");
        document.getElementById("eraserBtn").classList.add("active");
    }
}

function fitToContainer() {
    const parentSize = manageCanvas_drawCanvas.parentNode.getBoundingClientRect();
    var imageData = manageCanvas_drawCanvas.toDataURL(),
        tempImg = new Image();
    tempImg.onload = function() {
        const width = manageCanvas_drawCanvas.width,
            height = manageCanvas_drawCanvas.height,
            devicePixelRatio = window.devicePixelRatio;

            ctx.drawImage(tempImg, 0, 0, tempImg.width * devicePixelRatio, tempImg.height * devicePixelRatio, 0, 0, width, height);
    };
    manageCanvas_drawCanvas.width = parentSize.width;
    manageCanvas_drawCanvas.height = parentSize.height;
    tempImg.src = imageData;
}

function init() {
    manageCanvas_drawCanvas.addEventListener("mousedown", startDrawing);
    manageCanvas_drawCanvas.addEventListener("touchstart", startDrawing);

    manageCanvas_drawCanvas.addEventListener("mouseup", stopDrawing);
    manageCanvas_drawCanvas.addEventListener("touchend", stopDrawing);

    manageCanvas_drawCanvas.addEventListener("mousemove", drawCanvas);
    manageCanvas_drawCanvas.addEventListener("touchmove", drawCanvas);

    manageCanvas_drawCanvas.addEventListener("mouseleave", stopDrawing);
    manageCanvas_drawCanvas.addEventListener("touchcancel", stopDrawing);
}
init();