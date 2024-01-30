let get = (url, method = "GET") => {
    return new Promise((res, rej) => {
        let req = new XMLHttpRequest();
        req.open(method, url);
        req.send();
        req.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                try {
                    let json = JSON.parse(this.responseText);
                    res(json);
                } catch (error) {
                    return res(this.responseText);
                }
            }
            else if (this.status !== 200) {
                console.error(Error("XHR ENDED WITH CODE=>"), this.status, this.readyState);
                rej(this.status);
            }
        }
    });
}
async function gitProjects() {
    let data = await fetch("https://api.github.com/users/mohameda122ouz/repos");
    data = await data.json();

}

let projectController = {
    formContainer: null,
    sheild: null,
    cardCreator: function () {
        this.getAsFetch().then((res) => {
            console.log(res[0].imagePath);
            let dom = document.querySelector("#info");
            let value = "";
            res.forEach((el) => {
                value += `
                <div class="infoCard">
                <div class="cardicon">
                <iframe src="${el.link}" title="${el.name}"></iframe>
                </div>
                <div class="describe">
                <p class="text">${localStorage.getItem("preferedLang") === "ar" ? el.descriptionAR : el.descriptionEN}</p>
                </div><br>
                <p class="button" onclick="mgGlobalLinks('${el.link}')">${localStorage.getItem("preferedLang") === "ar" ? "زياره" : "visit"}</p>
                </div>
                `;
                console.log(value);
            });
            dom.innerHTML = value;
        });
    },
    createAcard: async function () {
        let res = await this.getAsFetch();
        let preferedLang = localStorage.getItem("preferedLang");
        let dom = document.querySelector("#info");
        let value = "";
        res.forEach(el => {
            value +=
                `
            <div class="infoCard">
            <div class="cardicon">
            <iframe src="${el.link}" title="${el.name}" onclick="return false;"></iframe>
            </div>
            <div class="describe">
            <p class="text" style="direction:${preferedLang === "ar" ? "rtl" : "ltr"};" >${preferedLang === "ar" ? el.descriptionAR : el.descriptionEN}</p>
            </div><br>
            <p class="button" onclick="mgGlobalLinks('${el.link}')">${preferedLang === "ar" ? "زياره" : "visit"}</p>
            </div>
            `;
        });
        dom.innerHTML = value;
    }
    ,
    getAsAJAX: function (URL) {
        let localurl;
        if (!URL) {
            localurl = window.location.origin + "/projects/files/file.json";
        }
        return get(URL || localurl);
    },
    getAsFetch: function (URL) {
        let localurl;
        if (!URL) {
            localurl = window.location.href.replace("/projects/projects.html", "/projects/files/file.json");
        }
        return fetch(URL || localurl, get).then((res) => {
            return res.json();
        });
    },
    getAsAsync: async function (URL) {
        let localurl;
        if (!URL) {
            localurl = window.location.origin + "/projects/files/file.json";
        }
        return await fetch(URL || localurl);
    },
    sendMessage: async function () {
        let button = document.querySelector("div[type=button]");
        let collectedBody = this.getMessageInfo();
        button.onclick = () => { return null };
        if (!collectedBody.body) {
            console.error(Error("Empty Body"));
            return Error("Empty Body");
        }
        button.querySelector(".dot").id = "dot";
        let data = await fetch("https://mail-fjc1.onrender.com/mail", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "to": "mohamedahmedusername@gmail.com",
                subject: this.getMessageInfo().subject,
                body: this.getMessageInfo().body
            })
        });
        // console.log(await data.json());
        if (data.status === 200) {
            button.innerHTML = `<div class="markerContainer"><div class="markerPlace"></div></div>`;
            button.onclick = () => { projectController.removeFromBody(); };
        }else{
            button.innerHTML = `<div class="markerContainer"><div class="markerPlace"></div></div>`;
            button.onclick = () => { projectController.removeFromBody(); };
        }
    },
    getMessageInfo: function () {
        try {
            const regexNumbers = /^\+\d{7,15}$|^\d{7,15}$/;
            const regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ig;
            let userField = document.getElementById("usernameField");
            let subjectField = document.getElementById("subjectField");
            let mailField = document.getElementById("mailField");
            let phoneField = document.getElementById("phoneField");
            let messageArea = document.getElementById("messageArea");
            //username
            if (!userField.value.length) {
                userField.style.color = "red";
                userField.style.borderBottomColor = "red";
                return Error("username is Empty");
            } else {
                userField.style.color = "white";
                userField.style.borderBottomColor = "white";
            }
            //email
            if (!regexMail.test(mailField.value)) {
                mailField.style.color = "red";
                mailField.style.borderBottomColor = "red";
                return Error("mail not vaild");
            } else {
                mailField.style.color = "white";
                mailField.style.borderBottomColor = "white";
            }
            //phone number
            if (!regexNumbers.test(phoneField.value) && ((phoneField.value).length)) {
                phoneField.style.color = "red";
                phoneField.style.borderBottomColor = "red";
                return Error("phone number not vaild");
            } else {
                phoneField.style.color = "white";
                phoneField.style.borderBottomColor = "white";
            }
            //subject
            if (!subjectField.value.length) {
                mailField.style.color = "red";
                mailField.style.borderBottomColor = "red";
                return Error("subject is Empty");
            } else {
                mailField.style.color = "white";
                mailField.style.borderBottomColor = "white";
            }
            //message area
            if (!messageArea.value.length) {
                messageArea.style.color = "red";
                messageArea.style.borderBottomColor = "red";
                return Error("message is Empty");
            } else {
                messageArea.style.color = "white";
                messageArea.style.borderBottomColor = "white";
            }
            sessionStorage.setItem("body", JSON.stringify({
                subject: subjectField.value,
                body: {
                    "username": userField.value,
                    "email": mailField.value,
                    "phone": phoneField.value,
                    "message": messageArea.value
                }
            }));
            return {
                subject: subjectField.value,
                body: {
                    "username": userField.value,
                    "email": mailField.value,
                    "phone": phoneField.value,
                    "message": messageArea.value
                }
            };
        } catch (e) {
            console.log(e);
        }
    },
    showMessageContainer: async function () {
        let form = await this.getAsAsync("projects/files/message.html");

        form = await form.text();
        let diver = this.appendToBody("div", "");
        diver.classList.add("shield");
        let div = this.appendToBody("div", form);
        div.classList.add("formContainer");
        this.formContainer = div;
        this.sheild = diver;
        try {
            let storedData = JSON.parse(sessionStorage.getItem("body"));
            let userField = document.getElementById("usernameField");
            let subjectField = document.getElementById("subjectField");
            let mailField = document.getElementById("mailField");
            let phoneField = document.getElementById("phoneField");
            let messageArea = document.getElementById("messageArea");
            userField.value = storedData.body.username;
            subjectField.value = storedData.subject;
            mailField.value = storedData.body.email;
            phoneField.value = storedData.body.phone;
            messageArea.value = storedData.body.message;
        } catch { }

    },
    /**
    *@returns {Element}
    **/
    appendToBody: function (elementName, html) {
        let tempEl = document.createElement(elementName);
        tempEl.innerHTML = html;
        document.body.append(tempEl);
        return tempEl;
    },
    removeFromBody: function () {
        document.body.removeChild(this.sheild);
        document.body.removeChild(this.formContainer);
    }
}