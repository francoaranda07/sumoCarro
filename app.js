const productPrice = document.querySelector('#productPrice');
const productUnidad = document.querySelector('#productUnidad');
const buttonSave = document.querySelector('#button-save');
const buttonCancel = document.querySelector('#button-cancel');
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

const sumLocalStorage = () => {
    let prices = JSON.parse(localStorage.getItem('prices')) || [];
    let totalSum = prices.reduce((acc, curr) => acc + curr, 0);
    totalOutput.textContent = addThousandSeparator(totalSum);
}

// Función para agregar el punto como separador de miles
function addThousandSeparator(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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


buttonSave.addEventListener('click', () => { //cuando de clic
    const price =  parseFloat(productPrice.value);
    var unidad = parseInt(productUnidad.value)
    if (isNaN(price) || price <= 0 || isNaN(unidad) || unidad <= 0) {
        clearInputs()
        presentAlertinput("Dato inválido", "Debe ingresar un número mayor a cero.");
        return;
    }
    if(unidad == 0 || unidad == ""){
        unidad = 1
    }

    insertDom(price * unidad); // Multiplicar precio por cantidad
    saveLocalStorage(price * unidad); // Guardar la suma en el localStorage
    sumLocalStorage(); // Actualizar el total
    clearInputs();
    productPrice.focus();
})

buttonCancel.addEventListener('click', () => {
    presentAlertDelete("¡Atención!", "¿Desea borrar todo?")
})

document.addEventListener('DOMContentLoaded', () => {
    // Establecer el foco en el campo de entrada del precio
    productPrice.focus();
});

getPricesLocalStorage()
sumLocalStorage()