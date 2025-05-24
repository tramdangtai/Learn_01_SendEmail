const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const messageUser = document.getElementById("message");



function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value =="") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }
        
        if (items[1].value != "") {
            checkEmail();
        }
        items[1].addEventListener("keyup", () => {
            checkEmail();
        });
        item.addEventListener("keyup", () => {
            if (item.value !="") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
};




function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value} <br> Email: ${email.value} <br> Phone: ${phone.value} <br> Message: ${messageUser.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "taitd.acehomecenter.2024@gmail.com",
        Password : "394AB32507B835874E9F3E16544317647074",
        To : 'taitd.acehomecenter.2024@gmail.com',
        From : "taitd.acehomecenter.2024@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
        }).then(
            message => {
                if (message =="OK") {
                    Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"
                    });
            }
        }
        );
    };



function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
        
        if (email.value != "") {
            errorTxtEmail.innerText = "Pls Enter a valid email address.";
        }
        else {
            errorTxtEmail.innerText = "Email can't be blank";
        }

    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !messageUser.classList.contains("error")) {
        sendEmail();
        form.reset();
        return false;
    }
});