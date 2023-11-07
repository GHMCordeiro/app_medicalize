/* SHOW AND HIDE PASSWORD */
const eyeIcons = document.querySelectorAll('.eye-icon');
const passwordInputs = document.querySelectorAll('input[type="password"]');

function togglePasswordVisibility(index) {
    if (passwordInputs[index].type === "password") {
        passwordInputs[index].type = "text";
        eyeIcons[index].src = "assets/img/icons/eye-off-outline_icon.png";
    } else {
        passwordInputs[index].type = "password";
        eyeIcons[index].src = "assets/img/icons/eye-outline_icon.png";
    }
}

eyeIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        togglePasswordVisibility(index);
    });
});

/* SHOW AND HIDE LEAFLET CONTENT */
const leafletItemHeaders = document.querySelectorAll(".leaflet-item-header");

leafletItemHeaders.forEach(leafletItemHeader => {
    leafletItemHeader.addEventListener("click", event => {
        leafletItemHeader.classList.toggle("active");
        const leafletItemBody = leafletItemHeader.nextElementSibling;
        const leafletItemHeaderIcon = leafletItemHeader.querySelector("span");

        if(leafletItemHeader.classList.contains("active")) {
            leafletItemBody.style.maxHeight = leafletItemBody.scrollHeight + "px";
            leafletItemHeaderIcon.innerHTML = "&minus;";
        } else {
            leafletItemBody.style.maxHeight = 0;
            leafletItemHeaderIcon.innerHTML = "&plus;";
        }
    });
});
