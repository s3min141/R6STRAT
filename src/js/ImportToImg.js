const ImportToImg_selectImportToImage = document.querySelector("#selectImportToImage"),
    ImportToImg_mainWindowContainer = document.querySelector("#mainWindowContainer"),
    ImportToImg_maxWindowWidth = screen.availWidth,
    ImportToImg_maxWindowHeight = screen.availHeight;

function handleClickBtn(event) {
    if (window.outerWidth !== ImportToImg_maxWindowWidth && window.outerHeight !== ImportToImg_maxWindowHeight) {
        if (userLang === "ko-KR") {
            alert("이미지로 변환하기전에 창 사이즈를 최대로 키워주세요.")
            return;
        }
        else {
            alert("Before import strategy to image, please set browser window to max size.")
            return;
        }
    }

    html2canvas(ImportToImg_mainWindowContainer).then(canvas => {
        canvas.toBlob(function (blob) {
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]);
        });
    });

    if (userLang === "ko-KR") {
        alert("이미지로 변환빛 복사완료.");
    }
    else {
        alert("Complete convert to image and copy.");
    }
}

function init() {
    ImportToImg_selectImportToImage.addEventListener("click", handleClickBtn);
}
init();