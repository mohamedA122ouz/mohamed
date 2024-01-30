let screen = innerHeight;
let screenWidth = innerWidth;
let totalheight = document.body.scrollHeight;
let load = document.getElementById("load");
let message = document.querySelector(".cIcon.div");
let increaseHight = lang == "ar"?2:0;
document.addEventListener("touchstart", () => { animation.load(); });
document.addEventListener("touchend", () => { animation.load(); });
document.addEventListener("touchend", () => { animation.load(); });
window.addEventListener("resize", ev => {
    screenWidth = innerWidth;
    screen = innerHeight;
});
let animation = {
    load: function () {
        let shown = scrollY;
        let booster = 125;
        // console.log(shown);
        load.style.cssText = `background-image:linear-gradient(45deg, rgb(255, 122, 155) ${(shown) / (totalheight - screen - booster) * 100}%, rgb(8, 135, 194)${(shown + 1) / (totalheight - screen - booster) * 100}%);`
    },
    welcomeSection: document.querySelector(".welcome"),
    controlWelcome: function () {
        let shown = scrollY;
        // console.log((screen - shown) / screen)
        let i = (screen - shown) / screen < 0.6 ? 0.6 : (screen - shown) / screen;
        this.welcomeSection.style.cssText = `transform: scale(${i - 0.01});`;
    },
    prev: document.getElementById("w"),
    nameAndMajor: document.querySelectorAll("#info>div>p"),
    startAnimation: function () {
        let shown = scrollY;
        let prev = this.prev.offsetHeight;
        // console.log(prev);
        if (prev < (shown + screen - (prev / 1.7)))
            this.nameAndMajor.forEach(el => {
                el.classList.add("animation");
            });
    },
    menu: document.querySelector("ul"),
    li: document.querySelectorAll("ul>li"),
    iscollapsed: true,
    collapse: function () {
        if (screenWidth <= 800) {
            if (!this.iscollapsed) {
                // this.menu.style.height = "0px";
                this.menu.removeAttribute("style");
                this.iscollapsed = !this.iscollapsed;
            } else {
                this.menu.style.height = `${this.menu.scrollHeight}px`;
                this.iscollapsed = !this.iscollapsed;
            }
        }

    }
}
let observer = new IntersectionObserver((Elements)=>{
    Elements.forEach(el=>{
        if(el.isIntersecting){
            message.style.cssText = ``;
        }
        else{
            message.style.cssText = `position: fixed;
            right: 10px;
            bottom: 20px;
            background-color: black;`;
        }
    })
},{threshold:1,rootMargin:"-10px"});
observer.observe(document.querySelector('a[href="mailto:studyatmohamed@gmail.com"]'));
