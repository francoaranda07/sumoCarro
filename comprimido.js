const productPrice=document.querySelector("#productPrice"),buttonSave=document.querySelector("#button-save"),buttonCancel=document.querySelector("#button-cancel"),productList=document.querySelector("#product-list"),clearAllData=document.querySelector("#button-clear"),totalOutput=document.querySelector("#total");let total=0;const insertDom=e=>{productList.innerHTML+=`\n        <ion-card>\n            <ion-card-content>\n                $ ${e}\n            </ion-card-content>\n        </ion-card>\n    `},getPricesLocalStorage=()=>{let e=JSON.parse(localStorage.getItem("prices"));if(null===e)productList.innerHTML="";else for(let t=0;t<e.length;t++)productList.innerHTML+=`\n                <ion-card>\n                    <ion-card-content>\n                        $ ${e[t]}\n                    </ion-card-content>\n                </ion-card>\n            `},saveLocalStorage=e=>{if(null===localStorage.getItem("prices")){let t=[];t.push(e),localStorage.setItem("prices",JSON.stringify(t))}else{let t=JSON.parse(localStorage.getItem("prices"));t.push(e),localStorage.setItem("prices",JSON.stringify(t))}},sumLocalStorage=()=>{var e=JSON.parse(localStorage.getItem("prices")),t=new Array,o=0;if(null===e)productList.innerHTML="";else{for(var r=0;r<e.length;r++)t.push(e[r]);t.forEach(function(e){o+=parseInt(e)}),totalOutput.textContent=o}},clearResult=()=>{productList.remove(),localStorage.removeItem("prices"),totalOutput.textContent="0",location.reload()},clearInputs=()=>{productPrice.value=""},presentAlertDelete=(e,t)=>{const o=document.createElement("ion-alert");return o.header=e,o.message=t,o.buttons=[{text:"Cancelar",handler:()=>{console.log("Cancel")}},{text:"Aceptar",handler:()=>{console.log("Confirm Ok"),productList.remove(),localStorage.removeItem("prices"),totalOutput.textContent="0",location.reload()}}],document.body.appendChild(o),o.present()},presentAlertinput=(e,t)=>{const o=document.createElement("ion-alert");return o.header=e,o.message=t,o.buttons=["Ok"],document.body.appendChild(o),o.present()},isEmpty=e=>!e.trim().length;buttonSave.addEventListener("click",()=>{const e=productPrice.value;e<=0||isEmpty(e)?presentAlertinput("Dato inválido","Debe ingresar un número."):(insertDom(e),saveLocalStorage(e),sumLocalStorage(),productPrice.value="")}),buttonCancel.addEventListener("click",()=>{presentAlertDelete("¡Atención!","¿Desea borrar todo?")}),getPricesLocalStorage(),sumLocalStorage();