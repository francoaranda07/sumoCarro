const productPrice = document.querySelector('#productPrice');
const productUnidad = document.querySelector('#productUnidad');
const buttonSave = document.querySelector('#button-save');
const buttonCancel = document.querySelector('#button-cancel');
const buttonLinkedin = document.querySelector('#button-linkedin')
const buttonInformation = document.querySelector('#button-info')
const productList = document.querySelector('#product-list')
const clearAllData = document.querySelector('#button-clear')
const totalOutput = document.querySelector('#total')
let total = 0

const insertDom = (price) => {
    productList.innerHTML = `
        <ion-card>
            <ion-card-content class="productList" style="display: flex; justify-content: space-between;">
                $ ${addThousandSeparator(price)}
                <ion-button color="danger" onclick="deleteItem(${price})"><ion-icon name="trash-outline"></ion-icon></ion-button>
            </ion-card-content>
        </ion-card>
    ` + productList.innerHTML; // Agregar el nuevo elemento al principio del HTML
}
const getPricesLocalStorage = () => {
    let prices = JSON.parse(localStorage.getItem('prices'));
    productList.innerHTML = "";
    if (prices !== null && prices.length > 0) {
        // Invertir el array
        prices.reverse();
        prices.forEach(price => {
            insertDom(price);
        });
    }
}

const saveLocalStorage = (price) => {
    let prices = JSON.parse(localStorage.getItem('prices')) || []; // Inicializar como array vacío si no hay datos
    // Agregar el nuevo precio al principio del array
    prices.unshift(price);
    localStorage.setItem('prices', JSON.stringify(prices));
}

function sumLocalStorage() {
    const totalOutput = document.querySelector("#totalOutput");
    let prices = JSON.parse(localStorage.getItem("precios")) || [];
  
    let totalSum = prices.reduce((acc, curr) => acc + curr, 0);
  
    // 🔧 Redondeo correcto a 2 decimales
    totalSum = Math.round((totalSum + Number.EPSILON) * 100) / 100;
  
    // Mostrar con separador de miles y 2 decimales forzados
    totalOutput.textContent = addThousandSeparator(totalSum.toFixed(2));
}
  

// Función para agregar el punto como separador de miles
function addThousandSeparator(number) {
    return Number(number).toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
}

const clearResult = () => {
    productList.innerHTML = "";
    localStorage.removeItem('prices');
    totalOutput.textContent = "0";
}

const clearInputs = () => {
    productPrice.value = "";
    productUnidad.value = 1;
}

const deleteItem = (item) =>{
    let prices = JSON.parse(localStorage.getItem('prices')) || [];
    let index = prices.indexOf(item);
    if (index !== -1) {
        prices.splice(index, 1);
        localStorage.setItem('prices', JSON.stringify(prices));
        productList.innerHTML = "";
        getPricesLocalStorage();
        sumLocalStorage();
    }
}

const presentAlertDelete = (header, msg) => {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = msg;
    alert.buttons = [
        {
            text: 'Cancelar',
            handler: () => {
                console.log('Cancel');
            }
        }, 
        {
            text: 'Aceptar',
            handler: () => {
                clearResult();
            }
        }
    ];
    document.body.appendChild(alert);
    return alert.present();
}
const presentAlertinput = (header, msg) => {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = msg;
    alert.buttons = ['Ok'];
    document.body.appendChild(alert);
    return alert.present();
}   

document.addEventListener('DOMContentLoaded', () => {
    // Establecer el foco en el campo de entrada del precio
    productPrice.focus();
});

// Event listener para el clic del botón
buttonSave.addEventListener('click', handleButtonClick);

// Event listener para la tecla Enter
productPrice.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleButtonClick();
    }
});

function handleButtonClick() {
    const price = parseFloat(productPrice.value);
    var unidad = parseInt(productUnidad.value)
    if (isNaN(price) || price <= 0 || isNaN(unidad) || unidad <= 0) {
        clearInputs()
        presentAlertinput("Dato inválido", "Debe ingresar un número mayor a cero.");
        return;
    }
    if (unidad == 0 || unidad == "") {
        unidad = 1
    }

    insertDom(price * unidad); // Multiplicar precio por cantidad
    saveLocalStorage(price * unidad); // Guardar la suma en el localStorage
    sumLocalStorage(); // Actualizar el total
    clearInputs();
    productPrice.focus();
}

buttonCancel.addEventListener('click', () => {
    presentAlertDelete("¡Atención!", "¿Desea borrar todo?")
})

buttonLinkedin.addEventListener('click', () => {
    // Abrir una nueva pestaña y redirigirla a la URL de LinkedIn
    window.open('https://www.linkedin.com/in/franco-aranda-054a911b6', '_blank');
});

buttonInformation.addEventListener('click', () =>{
    presentAlertinput("Manejo de datos", "Los datos ingresados son guardados únicamente en el local storage del navegador.")
})

getPricesLocalStorage()
sumLocalStorage()