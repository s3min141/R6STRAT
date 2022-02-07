var dragDrop_elementList = document.querySelectorAll(".originalElement"),
    dragDrop_iconOverlayConatiner = document.querySelector("#iconOverlayConatiner");

function handleClickOriginal(event) {
    const clonedElement = event.target.cloneNode(true);
    clonedElement.classList.add("nowDragging");
    clonedElement.classList.add("drag-and-drop");
    clonedElement.classList.remove("originalElement");
    clonedElement.setAttribute("hidden", "");
    dragDrop_iconOverlayConatiner.appendChild(clonedElement);

    clonedElement.addEventListener("mousedown", handleMouseDownEvent);
    clonedElement.addEventListener("mouseup", handleMouseUpEvent);

    document.addEventListener("mousemove", handleMouseMoveEvent);
}

function handleMouseMoveEvent(event) {
    const dragTargetElement = document.querySelector(".nowDragging");

    if (dragTargetElement !== null) {
        dragTargetElement.removeAttribute("hidden");

        event.preventDefault();

        dragTargetElement.style.top = (event.pageY - 15) + "px";
        dragTargetElement.style.left = (event.pageX - 15) + "px";
    }
}

function handleMouseDownEvent(event) {
    const targetElement = event.target;
    targetElement.classList.add("nowDragging");
}

function handleMouseUpEvent(event) {
    event.preventDefault();
    if (event.button === 1) {
        alert("Right Click!");
    }
    const targetElement = event.target;
    targetElement.classList.remove("nowDragging");
}

function dragDropMain() {
    elementList = document.querySelectorAll(".originalElement");

    for (var i = 0; i < elementList.length; i++) {
        elementList[i].addEventListener("click", handleClickOriginal, false);
    }
}
