document.addEventListener("click", clickCard);
const current: { card: HTMLElement | null } = { card: null };
function clickCard(ev: MouseEvent) {
    const currentEvent: HTMLElement = ev.target as HTMLElement;
    function selectParentNode() {
        if (current.card !== null && currentEvent.parentElement === current.card) return;
        current.card = currentEvent.parentElement;
        if (current.card !== null && current.card.className === "infoCard") {
            current.card.id = "currentlyShown";
            const div: HTMLElement = document.createElement('div');
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
                (ev.target as HTMLElement).removeChild(div);
            });
            (ev.target as HTMLElement)?.prepend(div);
            extend();
        }
    }
    if (current.card === null) {
        selectParentNode();
    } else {
        selectParentNode();
    }
}
function extend() {
    const currentPosition: [number, number] = [current.card!.offsetLeft, current.card!.offsetTop];
    const size: [number, number] = [current.card!.clientWidth, current.card!.clientHeight];
    const div: HTMLElement = document.createElement('div');
    current.card!.style.cssText = `
    position: absolute;
    left: ${currentPosition[0]}px;
    top: ${currentPosition[1]}px;
    width: ${size[0]}px;
    height: ${size[1]}px;
    `;
}
function removeExtend() {
    current.card!.removeAttribute("id");
    current.card!.removeAttribute("style");
}