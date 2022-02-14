const manageAlert_alertList = document.querySelector("#alertList");

function showAlert(message, type) {
    const alertElement = createAlertDiv(message, type);

    manageAlert_alertList.appendChild(alertElement);
    $(`#${alertElement.id}`).fadeTo(3000, 500).slideUp(500, function () {
        $(`#${alertElement.id}`).slideUp(500);
        $(`#${alertElement.id}`).remove();
    });
}

function createAlertDiv(message, type) {
    const mainDiv = document.createElement("div"),
        randStr = Math.random().toString(36).substr(2,11);
    mainDiv.id = randStr;
    mainDiv.classList.add("alert");
    mainDiv.classList.add(`alert-${type}`);
    mainDiv.classList.add("alertCss");
    mainDiv.setAttribute("role", "alert");
    mainDiv.innerText = message;
    mainDiv.style.display = "none";
    return mainDiv;
}