const buttonLeaveOrder = document.getElementById("request");

const login = document.getElementById("login");
const email = document.getElementById("email");


buttonLeaveOrder.addEventListener("click", () => {
    if (login.value.trim().length > 0 && email.value.trim().length > 0) {

        let link = "https://kirhost.onrender.com/order/leaveOrder";

        const path = window.location.href;
        if(path.includes("service")){
            link += `/${path.split('/').pop()}`//it will be like /order/leaveOrder/:id
        }

        axios.post(link, {
            email: email.value,
            login: login.value
        }).then((res) => {
            if (res.status === 200) {
                alert("Успешно");
                localStorage.setItem("user", email.value)
            }
        })
    }
})