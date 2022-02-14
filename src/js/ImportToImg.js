const ImportToImg_selectImportToImage = document.querySelector("#selectImportToImage"),
    ImportToImg_captureDiv = document.querySelector("#drawingComponents"),
    ImportToImg_maxWindowWidth = screen.availWidth,
    ImportToImg_maxWindowHeight = screen.availHeight;

function handleClickBtn(event) {
    if (window.outerWidth !== ImportToImg_maxWindowWidth && window.outerHeight !== ImportToImg_maxWindowHeight) {
        if (userLang === "ko-KR") {
            showAlert("이미지로 변환하기전에 창 사이즈를 최대로 키워주세요.", "danger")
            return;
        }
        else {
            showAlert("Before import strategy to image, please set browser window to max size.", "danger")
            return;
        }
    }

    html2canvas(ImportToImg_captureDiv).then(canvas => {
        canvas.toBlob(function (blob) {
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]);

            if (userLang === "ko-KR") {
                showAlert("이미지로 변환및 복사완료.", "success");
            }
            else {
                showAlert("Complete convert to image and copy.", "success");
            }
        });
    });
}

function init() {
    ImportToImg_selectImportToImage.addEventListener("click", handleClickBtn);
}
init();