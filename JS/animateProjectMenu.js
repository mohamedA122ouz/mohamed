"use strict";
document.addEventListener("click", clickCard);
const current = { card: null };
function clickCard(ev) {
    const currentEvent = ev.target;
    function selectParentNode() {
        if (current.card !== null && currentEvent.parentElement === current.card)
            return;
        current.card = currentEvent.parentElement;
        if (current.card !== null && current.card.className === "infoCard") {
            current.card.id = "currentlyShown";
            const div = document.createElement('div');
            div.textContent = 'X';
            div.style.cssText = `
            color:red;
            fontSize:1.5;
            cursor:pointer;
            width: max-content;
            height: max-content;
            margin:20px;
            `;
            div.addEventListener("click", () => {
                removeExtend();
                ev.target.removeChild(div);
            });
            ev.target?.prepend(div);
            extend();
        }
    }
    if (current.card === null) {
        selectParentNode();
    }
    else {
        selectParentNode();
    }
}
function extend() {
    const currentPosition = [current.card.offsetLeft, current.card.offsetTop];
    const size = [current.card.clientWidth, current.card.clientHeight];
    const div = document.createElement('div');
    current.card.style.cssText = `
    position: absolute;
    left: ${currentPosition[0]}px;
    top: ${currentPosition[1]}px;
    width: ${size[0]}px;
    height: ${size[1]}px;
    `;
}
function removeExtend() {
    current.card.removeAttribute("id");
    current.card.removeAttribute("style");
}
