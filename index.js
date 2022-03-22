
window.addEventListener("scroll",()=>{
    document.querySelector("nav").classList.toggle("window__scroll",window.scrollY>40)
})
const shoppingIcon =document.querySelector(".shopping__icon")
const shoppingCart=document.querySelector(".shopping__cart")
const productEl =document.querySelector (".product__container")
const cartItemEL =document.querySelector(".cart__items")
const totalEl =document.querySelector(".total__price")
const itemEl=document.querySelector(".items__number")
const shoppingNumber=document.querySelector(".shopping__number")
const navcontainer= document.querySelector(".nav__container")
const btn =document.querySelector(".button")






btn.addEventListener("click",()=>{
    navcontainer.classList.toggle("active") 
    btn.classList.toggle("active")
})

shoppingIcon.addEventListener("click",()=>{

    shoppingCart.classList.toggle("open")

})



function renderProduct(){
    products.forEach((product)=>{
    productEl.innerHTML+=`
    <article>
        <div class="image">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="name">
                    <h3>${product.name}</h3>
                </div>
                <div class="info">
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div class="price">
                    <p>$${product.price}</p>
                </div>
                <div class="add__icon"onclick ="addToCart(${product.id}) ">
                    <i class="fa-solid fa-plus"  ></i>
                </div>

            </article>`

})
}
renderProduct()
let cart=[]

function addToCart(id){
    if(cart.some((item)=>item.id===id)){
        alert("this Item already Added")
        return
    }else{

        const items =products.find((product)=>product.id===id)
        cart.push({
            ...items,
            changeNumberOfUnits:1
            
        })
    }
    updateCart()
}

function updateCart(){
    renderCartItem()
    renderTotal()
}


function renderCartItem(){
    cartItemEL.innerHTML=""
    cart.forEach((item)=>{
        cartItemEL.innerHTML+=`
        <li>
        <div class="item">
            <img src="${item.img}" alt="${item.name}">

            <div class="units">
                <div class="minus" onclick="updateNumber('minus',${item.id})">-</div>
                <div class="units__number">${item.changeNumberOfUnits}</div>
                <div class="plus"  onclick="updateNumber('plus',${item.id})">+</div>
            </div>
            <div class="price">$${item.price}</div>
            <div class="remove" onclick='remove(${item.id})'><i class="fa-solid fa-trash"></i></div>

        </div> 
       
     </li>

        `
    })
}
function updateNumber(action,id){
    
    cart=cart.map((item)=>{
        let changeNumberOfUnits =item.changeNumberOfUnits
        if(item.id===id){
            if(action==='minus' && changeNumberOfUnits>1){
                changeNumberOfUnits--
            }
            else if(action==='plus'){
                changeNumberOfUnits++
            }

        }
        return({
            ...item,
            changeNumberOfUnits
        })

    })
    updateCart()
}

function renderTotal(){
    let totalPrice =0;
    let totalItem=0;
    cart.forEach((item)=>{
        totalPrice+= item.price *item.changeNumberOfUnits
        totalItem+=item.changeNumberOfUnits
    })
    totalEl.innerHTML = "$ "+totalPrice.toFixed(2)
    itemEl.innerHTML=totalItem
    shoppingNumber.innerHTML=totalItem
    

}

function remove(id){
    cart=cart.filter((item)=>item.id!==id)
    updateCart()
}