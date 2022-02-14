var targetIcon;

$(document).bind("contextmenu", function (event) {
    event.preventDefault();
    if (event.target.classList.contains("drag-and-drop")) {
        $(".custom-menu").finish().toggle(100).
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
        targetIcon = event.target;
    }
});

$(document).bind("mousedown", function (event) {
    if (!$(event.target).parents(".custom-menu").length > 0) {
        $(".custom-menu").hide(100);
    }
});

$(".custom-menu li").click(function (event) {
    switch ($(this).attr("data-action")) {
        case "remove": removeIcon(targetIcon); break;
    }
    $(".custom-menu").hide(100);
});

function removeIcon(element) {
    if (userLang === "ko-KR") {
        if (!confirm("이 아이콘을 지우시겠습니까?")) {
            return;
        }
    }
    else {
        if (!confirm("Are you sure to erase this icon?")) {
            return;
        }
    }
    element.remove();
}