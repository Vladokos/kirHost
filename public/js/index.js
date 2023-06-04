const req = document.getElementsByClassName("req");

const popup = document.getElementsByClassName("popup")[0];
const close = document.getElementsByClassName("close")[0];

const offerTitlesButton = document.getElementsByClassName("offer_title");

for (let i = 0; i < offerTitlesButton.length; i++) {

    offerTitlesButton[i].addEventListener("click", () => {
        const title = offerTitlesButton[i].innerText;

        localStorage.setItem("service", title);
    })
}

for (let i = 0; i < req.length; i++) {


    req[i].addEventListener("click", () => {
        if (!popup.classList.contains("active")) {
            popup.classList.add("active")
        }
    })

}

close.addEventListener("click", () => {
    popup.classList.remove("active")
})