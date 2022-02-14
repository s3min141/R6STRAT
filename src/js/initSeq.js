var userLang = localStorage.getItem("userLang");

function init() {
    if (userLang === null) {
        var type = navigator.appName;
        if (type == "Netscape") {
            var navigatorLang = navigator.language;
        } else {
            var navigatorLang = navigator.userLanguage;
        }

        userLang = navigatorLang;
        localStorage.setItem("userLang", navigatorLang);
    }
}

function changeLang() {
    init();

    if (userLang === "ko-KR") {
        if (confirm("언어을 영어로 바꾸시겠습니까? (현재 작업물이 사라집니다)")) {
            localStorage.setItem("userLang", "en-US");
            location.reload();
        }
    }
    else {
        if (confirm("Are you sure to change language to korean?\n(You will lose your project)")) {
            localStorage.setItem("userLang", "ko-KR");
            location.reload();
        }
    }
}

function resizeToolBoxHeight() {
    const innerHeight = window.innerHeight,
        innerWidth = window.innerWidth,
        mapImg = document.querySelector("#mapImg"),
        toolBoxDiv = document.querySelector("#toolBoxDiv");
    if (mapImg != null && innerWidth < 1200) {
        toolBoxDiv.style.height = `${innerHeight - (mapImg.height + 2)}px`;
    }
    else {
        toolBoxDiv.style.height = "685px";
    }
}

function hideUpperRightMenuBar() {
    const menuBar = document.querySelector("#menuBar");
    if (menuBar.getAttribute("hidden") === null) {
        menuBar.setAttribute("hidden", "");
    }
    else {
        menuBar.removeAttribute("hidden");
    }
}

init();
resizeToolBoxHeight();
if (userLang === "ko-KR") {
    document.querySelector("#selectResetIconBtn").innerText = "아이콘 초기화";
    document.querySelector("#selectResetDrawBtn").innerText = "그림 초기화";
    document.querySelector("#selectImportToImage").innerText = "이미지로 변환";
    document.querySelector("#removeLi").innerText = "지우기";
    document.querySelector("#colorLabel").innerText
}
else {
    document.querySelector("#selectResetIconBtn").innerText = "Reset icon";
    document.querySelector("#selectResetDrawBtn").innerText = "Reset drawing";
    document.querySelector("#selectImportToImage").innerText = "Convert to img";
    document.querySelector("#removeLi").innerText = "Remove";
}

var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        resizeToolBoxHeight();
        fitToContainer();
    }               
}