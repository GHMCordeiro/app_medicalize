document.addEventListener('DOMContentLoaded', function() {

    /* SHOW AND HIDE PASSWORD */
    const eyeIcons = document.querySelectorAll('#eye-icon');
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    function togglePasswordVisibility(index) {
        if (passwordInputs[index].type === "password") {
        passwordInputs[index].type = "text";
        eyeIcons[index].src = "/img/icons/eye-off-outline_icon.png";
    } else {
        passwordInputs[index].type = "password";
        eyeIcons[index].src = "/img/icons/eye-outline_icon.png";
    }
    }

    eyeIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            togglePasswordVisibility(index);
        });
    });

    /* "FAVORITE" AND "UNFAVORITE" A MEDICATION */
    const favoriteIcon = document.getElementById('star-status');
    const starIcon = document.querySelector('#star-status img');
    document.addEventListener('DOMContentLoaded', function () {
        favoriteIcon.addEventListener('click', () => {
            const starOutlinePath = "assets/img/icons/star-outline_icon.svg";
            const starFilledPath = "assets/img/icons/star_icon.svg";
            if (starIcon.src.includes(starOutlinePath)) {
                starIcon.src = starFilledPath;
            } else {
                starIcon.src = starOutlinePath;
            }
        });
    })
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

/* FLOAT LABEL */
const inputs = document.querySelectorAll(".input-text");
const labels = document.querySelectorAll(".input-field label");

inputs.forEach((input, index) => {
    input.addEventListener("focus", () => {
        labels[index].style.fontSize = "0.8rem";
        labels[index].style.top = "5px";
        labels[index].style.transform = "none";
        labels[index].style.color = "#b7b7b7";
    });

     input.addEventListener("blur", () => {
        if (input.value === "") {
            labels[index].style.fontSize = "1.1rem";
            labels[index].style.top = "50%";
            labels[index].style.transform = "translateY(-50%)";
            labels[index].style.color = "#888888";
        } else{
            input.style.fontSize = "0.9rem";
            input.style.width = "calc(100% - 20px)";
            input.style.height = "auto";
            input.style.position = "absolute";
            input.style.bottom = "5px";
        }
    });
});

/* UPLOAD DOCTOR'S PRESCRIPTION */
document.querySelectorAll('.event').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var arquivoInput = document.querySelector('.file-input');
        var clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        arquivoInput.dispatchEvent(clickEvent);
    });
});

document.querySelectorAll('.file-input').forEach(function(arquivoInput) {
    arquivoInput.addEventListener('change', function() {
        
        var fileName = arquivoInput.files[0].name;
        
        var fileOutput = document.querySelector('#file-name');
        fileOutput.value = fileName;
    });
});

/* TOTAL PRICE IN REAL TIME */
document.addEventListener('DOMContentLoaded', function () {
    let quantity = 1;
    let unitPriceElement = document.getElementById('unit-price');
    let totalElement = document.getElementById('total-price');
    let totalElementHidden = document.getElementById('total-price-hidden');

    let unitPrice = parseFloat(unitPriceElement.innerText.replace('R$', '').replace(',', '.'));

    function updateQuantity(amount) {
        quantity += amount;
        if (quantity < 1) {
            quantity = 1;
        }
        document.getElementById('quantity').innerText = quantity;
        updateTotalPrice();
    }

    function updateTotalPrice() {
        const totalPrice = quantity * unitPrice;
        const formattedPrice = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        if (totalElement.value) {
            totalElement.value = formattedPrice;
            totalElementHidden.value = totalPrice;
        }
    }

    document.getElementById('subtraction').addEventListener('click', function () {
        updateQuantity(-1);
    });

    document.getElementById('addition').addEventListener('click', function () {
        updateQuantity(1);
    });
});


const errorAlertBox = document.querySelector('.error-alert-box');

        // Adiciona um ouvinte de evento de clique ao documento
        document.addEventListener('click', function(event) {
            // Verifica se o clique não ocorreu dentro do elemento .error-alert-box
            if (!errorAlertBox.contains(event.target)) {
                // Oculta o elemento .error-alert-box se o clique não foi dentro dele
                errorAlertBox.style.display = 'none';
            }
        });