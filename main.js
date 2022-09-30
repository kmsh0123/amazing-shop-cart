import './style.scss'
import {removeLoaderUi, showLoaderUi} from "./JavaScript/loader";

let items = [];

let itemRows = document.querySelector(".items-row");
let cartBtn = document.querySelector(".cart-btn");

// const addBtn = document.querySelectorAll(".add-carts")

showLoaderUi();
fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>{
            items = json;

            items.forEach(items=>{
                let itemDiv = document.createElement("div");
                itemDiv.classList.add("col-lg-4","col-12","col-md-6");
                itemDiv.innerHTML = `
                <div class="card item-card m-2">
                    <div class="card-body d-flex flex-column">
                        <div class="mb-3">
                            <img src="${items.image}" class="items-img" alt="">
                        </div>
                <div class="card-title fw-bold text-truncate">${items.title}</div>
                <p class="card-text small">${items.description.substring(0,100)}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <p class="fw-bold mb-0">$<span>100</span></p>
                            <button class="btn btn-outline-primary add-carts" onclick="addToCart(event)">
                                <i class="bi bi-cart-plus pe-none me-1"></i>Add Cart
                            </button>
                        </div>
                    </div>
                </div>
                `;
                itemRows.append(itemDiv);
            })
        setTimeout(_=>removeLoaderUi(),500)
    })

// itemRows.onclick = function (e) {
//     if (e.target.classList.contains("add-carts")){
//         console.log("Testing Good");
//     }
// }

window.addToCart = function (event) {
    if (event.target.classList.contains("add-carts")){
        let currentItemCard = event.target.closest(".item-card")
        let currentItemImg = currentItemCard.querySelector(".items-img");

        let newImg = new Image();
        newImg.src = currentItemImg.src;
        newImg.style.position = "fixed";
        newImg.style.height = 100+"px";
        newImg.style.top = currentItemImg.getBoundingClientRect().top+"px";
        newImg.style.left = currentItemImg.getBoundingClientRect().left+"px";

        setTimeout(_=> {
            newImg.style.height = 0+'px';
            newImg.style.zIndex = 2000;
            newImg.style.transition = 0.5 +"s";
            newImg.style.transform = "rotate(360deg)";
            newImg.style.top = cartBtn.querySelector(".bi").getBoundingClientRect().top + "px";
            newImg.style.left = cartBtn.querySelector(".bi").getBoundingClientRect().left + "px";
        },0);
        setTimeout(_=>{
            cartBtn.classList.add("animate__tada");
            cartBtn.onanimationend =_=> {
                cartBtn.classList.remove("animate__tada");
            }
        },400)

        document.body.append(newImg);

        console.log(newImg);
    }
}
