const fonts = ["cursive", "sans-serif", "serif", "monospace"];
const colors = ["Maroon", "Red", "Orange", "Olive", "Green", "Purple", "Fuchsia", "Lime", "Teal", "Aqua", "Blue", "Navy", "Black", "Gray", "Silver"];
let captchaValue = "";

function generateCaptcha() {
    let value = btoa(Math.random() * 1000000000);
    value = value.substr(0, 5 + Math.random() * 5);
    captchaValue = value;
}

function setCaptcha() {
    let html = captchaValue
        .split("")
        .map((char) => {
            const rotated = -30 + Math.trunc(Math.random() * 60);
            const font = Math.trunc(Math.random() * fonts.length);
            const color = Math.trunc(Math.random() * colors.length);
            return `<p class="dib" style="
                        color: ${colors[color]};
                        transform: rotate(${rotated}deg); 
                        font-family:${fonts[font]}
                    "> ${char}  
                </p>`;
        })
        .join("");
    // document.getElementsByClassName(".captcha-preview")
    document.querySelector(".captcha-preview").innerHTML = html;
}

function initCaptcha() {
    document.querySelector("#refresh").addEventListener("click", function () {
        generateCaptcha();
        setCaptcha();
    });
    generateCaptcha();
    setCaptcha();
}

initCaptcha();

document.getElementById("sendmail").addEventListener("click", () => {
    let inputCaptchaValue = document.getElementById("captcha").value;

    if (inputCaptchaValue === captchaValue) {
        swal("", "Logging In!!", "success");
        setTimeout(() => {
            location.reload();
        }, 3000);
    } else {
        swal("Invalid captcha");
    }
});
