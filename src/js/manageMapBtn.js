var manage_MapBtn_nowFloor = 1;

const manageMapBtn_drawCanvas = document.querySelector("#drawCanvas"),
    manageMapBtn_BtnList = new Array(
        "Bank",
        "Chalet",
        "Clubhouse",
        "Coastline",
        "Kafe",
        "Oregon",
        "Villa",
    ),
    manageMapBtb_maxFloorList = {
        "bank": 2,
        "chalet": 2,
        "clubhouse": 2,
        "coastline": 2,
        "kafe": 3,
        "oregon": 2,
        "villa": 2,
    },
    manageMapBtb_minFloorList = {
        "bank": -1,
        "chalet": -1,
        "clubhouse": -1,
        "coastline": 1,
        "kafe": 1,
        "oregon": -1,
        "villa": -1,
    };

function manageSectorNum(isUp) {
    if (isUp === true) {
        const maxFloor = manageMapBtb_maxFloorList[manageMapBtn_drawCanvas.dataset.nowMap];
        if (manage_MapBtn_nowFloor >= maxFloor) {
            if (userLang === "ko-KR") {
                showAlert("가장 높은층입니다!", "warning");
            }
            else {
                showAlert("maximum floor!", "warning");
            }
            return;
        }

        manage_MapBtn_nowFloor++;
        if (manage_MapBtn_nowFloor === 0) {
            manage_MapBtn_nowFloor = 1;
        }
        loadMapImage(manageMapBtn_drawCanvas.dataset.nowMap, false);
    }
    else {
        const minFloor = manageMapBtb_minFloorList[manageMapBtn_drawCanvas.dataset.nowMap];
        if (manage_MapBtn_nowFloor <= minFloor) {
            if (userLang === "ko-KR") {
                showAlert("가장 아랫층입니다!", "warning");
            }
            else {
                showAlert("minimum floor!", "warning");
            }
            return;
        }

        manage_MapBtn_nowFloor--;
        if (manage_MapBtn_nowFloor === 0) {
            manage_MapBtn_nowFloor = -1;
        }
        loadMapImage(manageMapBtn_drawCanvas.dataset.nowMap, false);
    }
}

function handleClickMapBtn(event) {
    loadMapImage(event.target.id.toLowerCase(), true);
}

function loadMapImage(mapName, isMapButton) {
    if (manageMapBtn_drawCanvas !== null) {
        manageMapBtn_drawCanvas.dataset.nowMap = mapName;
    }

    preloadedImages.forEach((element) => {
        var nowStair = manage_MapBtn_nowFloor;
        if (nowStair <= -1) {
            nowStair = "b1";
        }

        if (isMapButton) {
            nowStair = 1;
            manage_MapBtn_nowFloor = 1;
        }

        if (element.src.includes("mapImg") && element.src.includes(`${mapName}${nowStair}f`)) {
            element.id = "mapImg";
            element.addEventListener("load", resizeToolBoxHeight);
            element.addEventListener("load", fitToContainer);

            if ($("#mapImg") !== null) {
                $("#mapImg").remove();
            }
            $("#drawCanvas").after(element);
        }
    });
}

function setEventListener() {
    manageMapBtn_BtnList.forEach(element => {
        const mapBtn = document.querySelector(`#${element}`);
        mapBtn.addEventListener("click", handleClickMapBtn);
    });
}