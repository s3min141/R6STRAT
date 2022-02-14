const toolManage_mainItemsContainer = document.querySelector("#mainItemsContainer"),
    toolManage_selectResetIcon = document.querySelector("#selectResetIconBtn"),
    toolManage_selectResetDrawBtn = document.querySelector("#selectResetDrawBtn");

function addMapImage() {
    const mapTabDiv = document.createElement("div");
    mapTabDiv.id = "mapTabDiv";
    mapTabDiv.appendChild(createMapBtn("Bank"));
    mapTabDiv.appendChild(createMapBtn("Chalet"));
    mapTabDiv.appendChild(createMapBtn("Clubhouse"));
    mapTabDiv.appendChild(createMapBtn("Coastline"));
    mapTabDiv.appendChild(createMapBtn("Kafe"));
    mapTabDiv.appendChild(createMapBtn("Oregon"));
    mapTabDiv.appendChild(createMapBtn("Villa"));
    toolManage_mainItemsContainer.appendChild(mapTabDiv);

    if (userLang === "ko-KR") {
        document.querySelector("#Bank").innerText = "은행";
        document.querySelector("#Chalet").innerText = "별장";
        document.querySelector("#Clubhouse").innerText = "클럽하우스";
        document.querySelector("#Coastline").innerText = "해안선";
        document.querySelector("#Kafe").innerText = "카페";
        document.querySelector("#Oregon").innerText = "오리건";
        document.querySelector("#Villa").innerText = "빌라";
    }
    setEventListener();
}

function createMapBtn(buttonText) {
    const mapButton = document.createElement("button");
    mapButton.id = buttonText;
    mapButton.classList.add("btn");
    mapButton.classList.add("btn-outline-info");
    mapButton.classList.add("btn-sm");
    mapButton.innerText = buttonText;
    mapButton.type = "button";
    mapButton.style.marginRight = "5px";
    return mapButton;
}

function addOperatorIcons() {
    const operatorTabDiv = document.createElement("div");
    const attackerDiv = document.createElement("div");
    const defenderDiv = document.createElement("div");
    operatorTabDiv.id = "operatorTabDiv";
    attackerDiv.id = "attackerDiv";
    defenderDiv.id = "defenderDiv";

    preloadedImages.forEach((element) => {

        if (element.src.includes("defenderIcon") || element.src.includes("attackerIcon")) {
            element.classList.add("operatorIcon");
            element.classList.add("originalElement");
            element.style.cursor = "pointer";

            if (element.src.includes("attackerIcon")) {
                attackerDiv.appendChild(element);
            }
            else {
                defenderDiv.appendChild(element);
            }
        }
    });

    operatorTabDiv.appendChild(attackerDiv);
    operatorTabDiv.appendChild(defenderDiv);
    toolManage_mainItemsContainer.appendChild(operatorTabDiv);
    dragDropMain();
}

function addGadgetIcons() {
    const gadgetDiv = document.createElement("div");
    gadgetDiv.id = "gadgetTabDiv";
    gadgetDiv.style.marginBottom = "10px";

    preloadedImages.forEach((element) => {
        if (element.src.includes("gadgetIcon")) {
            element.classList.add("gadgetIcon");
            element.classList.add("originalElement");
            element.style.marginRight = "5px";
            element.style.cursor = "pointer";
            gadgetDiv.appendChild(element);
        }
    });

    toolManage_mainItemsContainer.appendChild(gadgetDiv);
    dragDropMain();
}

function deleteCanvas() {
    var drawCanvas = document.querySelector("#drawCanvas");
    var ctx = drawCanvas.getContext("2d");

    if (userLang === "ko-KR") {
        if (confirm("모든 그림을 지우시겠습니까?")) {
            ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
            showAlert("모든 그림을 지웠습니다", "success");
        }
    }
    else {
        if (confirm("Are you sure to erase all drawing?")) {
            ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
            showAlert("Drawing has cleared", "success");
        }
    }
}

function resetIcon() {
    if (userLang === "ko-KR") {
        if (confirm("모든 아이콘을 지우시겠습니까?")) {
            $("#iconOverlayConatiner").empty();
            showAlert("모든 아이콘을 지웠습니다", "success");
        }
    }
    else {
        if (confirm("Are you sure to erase all icons?")) {
            $("#iconOverlayConatiner").empty();
            showAlert("Icon has cleared", "success");
        }
    }
}

function setAboutInfos() {
    const infoContent = document.querySelector("#infoContent"),
        manualContent = document.querySelector("#manualContent");

    if (userLang === "ko-KR") {
        infoContent.innerText = "*참조*\nR6TAC_ALLMAPS(otariga)\nr6operators[Copyright (c) 2021 Marco Vockner (MIT License)]\n도움: AssassIn(이동영)";
        manualContent.innerText = "*사용법*\n\n[드래그앤드랍 아이콘]\n*오퍼레이터* 또는 *가젯*탭에서 아이콘들을 찾아볼수있습니다.\n클릭하면 마우스포인터에 복사되어 따라다니며 한번더 클릭시 그 위치에 놔둘수있으며 아이콘을 오른쪽클릭시 삭제가 가능합니다.\n\n[맵선택]\n*Map*탭에서 맵을 선택할수있으며, 오른쪽상단의 컨트롤 메뉴에서 층을 선택할수있습니다.\n\n[이미지로 변환]\n*이미지로 변환*이라고 된 버튼을 누르게 되면 작성한 전략의 스크린샷이 클립보드에 복사됩니다.";
    }
    else {
        infoContent.innerText = "*Reference*\nR6TAC_ALLMAPS(otariga)\nr6operators[Copyright (c) 2021 Marco Vockner (MIT License)]\nHelper: AssassIn(Lee Dong Young)";
        manualContent.innerText = "*How to use*\n\n[Drag&Drop Icons]\nyou can select icon on *Tab* after click it and it will duplicate to your mouse pointer then drop where you want\nalso you can erase icon one by one, if you right click icon it will show custom menu, click remove button then it will erase icon\n\n[Map Selection]\nyou can select map on *Tab* and also you can select floor by control panel where located at upper right\n\n[Convert to image]\nwhen you clicked *Convert to image* Button your strategy will copy to clipborad";
    }
}

function createDivider(name) {
    const divider = document.createElement("hr");
    divider.classList.add(name);
    return divider;
}

function init() {
    addMapImage();
    addOperatorIcons();
    addGadgetIcons();

    $("#mapTabDiv").after(createDivider("divider"));
    $("#drawingToolDiv").after(createDivider("divider"));
    $("#operatorTabDiv").after(createDivider("divider"));
    $("#attackerDiv").after(createDivider("divider"));

    toolManage_selectResetIcon.addEventListener("click", resetIcon);
    toolManage_selectResetDrawBtn.addEventListener("click", deleteCanvas);

    loadMapImage("bank", false);
}
init();