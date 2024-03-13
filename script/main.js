///menu-food-scroll
"use-strict";
let lista_food = document.querySelector(".lista-food");
let move_right = document.querySelector(".to-right");
let move_left = document.querySelector(".to-left");
let dropdown_triangles = document.querySelectorAll(".list-item-after");
let dropdown = document.querySelector(".dropdown");

const min = (a,b) => {
    if(a <= b)return a;
    else return b;
}


///manejando cambios de tamano

window.addEventListener("resize",(e)=>{
    dropdown_triangles.forEach(element => {
        hideElement(element);
    });
});

function rightMove(cur = 130){
    dropdown_triangles.forEach(element => {
        hideElement(element);
    });

    let total = lista_food.scrollWidth;
    total = total - lista_food.clientWidth;

    cur = min(cur , total-lista_food.scrollLeft);
    lista_food.scrollLeft += cur;

    if(cur<100){
        move_right.classList.add("oculto");
    }

    if(move_left.classList.contains("oculto")){
        move_left.classList.remove("oculto");
    }
    console.log(cur);
}
function leftMove(cur = 130){
    dropdown_triangles.forEach(element => {
        hideElement(element);
    });

    cur = min(cur , lista_food.scrollLeft);
    lista_food.scrollLeft -= cur;

    if(lista_food.scrollLeft == 0){
        move_left.classList.add("oculto");
    }
    if(move_right.classList.contains("oculto")){
        move_right.classList.remove("oculto");
    }
}

move_right.addEventListener("click",(e)=>{
    rightMove();
});

move_left.addEventListener("click",(e)=>{
    leftMove();
});



let menu = [
    ['Entrantes','Desayunos','Comidas Criollas','Sandwiches','Hamburguesas','Hot Dog'],
    ['Pizza','Pizza Familiar','Pastas'],
    ['Tacos'],
    ['Bebidas','Cocteles','Infusiones - Cafe'],
    ['Dulces','Helado']
];


const hideElement = (e) =>{
    let index = e.dataset.index;
    e.dataset.open = 0;

    let dropdown = document.querySelectorAll(".dropdown")[index];
    if(!dropdown.classList.contains("oculto")){
        dropdown.classList.add("oculto");
    }
}
const showElement = (e) =>{
    let index = e.dataset.index;
    e.dataset.open = 1;
    let t = document.querySelector(".lista-food").scrollLeft;

    let dropdown = document.querySelectorAll(".dropdown")[index];
    if(dropdown.classList.contains("oculto")){
        dropdown.style.transform = `translateX(${-t}px)`;
        dropdown.classList.remove("oculto");
    }
}

dropdown_triangles.forEach(boton => {;

    boton.addEventListener("click",(e)=>{
        e.stopPropagation();
        let parent = boton.parentNode;
        let childrens = parent.childNodes;

        if(boton.dataset.open == 0){

            dropdown_triangles.forEach(element => {
                hideElement(element);
            });

            showElement(boton);
        }
        else {
            hideElement(boton);
        }
    });
});

///TOGLE OPTION
let left_togle = document.querySelector(".toogle-left");
let right_togle = document.querySelector(".toogle-right");

left_togle.addEventListener("click",(e)=>{
    if(!left_togle.classList.contains("selected")){
        right_togle.classList.toggle("selected");
        left_togle.classList.toggle("selected");
    }
});

right_togle.addEventListener("click",(e)=>{
    if(!right_togle.classList.contains("selected")){
        right_togle.classList.toggle("selected");
        left_togle.classList.toggle("selected");
    }
});



/////////////////Observer////////////////////////

let lastScroll = 0;
let hidden = 0;
window.addEventListener("scroll",(e)=>{
    dropdown_triangles.forEach(element => {
        hideElement(element);
    });
    let section_name = document.querySelector(".section-name");

    let actual = window.scrollY;

    let difference = actual - lastScroll;

    section_name.style.transform = `translateY(${-actual}px)`;

    let abs = Math.abs(actual);
    let order_info = document.querySelector(".order-info");
    let menu = document.querySelector(".food-menu");

    if(abs<90){
        order_info.style.transform = `translateY(${-actual}px)`;
        menu.style.transform = `translateY(${-actual}px)`;
    }

    if(actual > 90 && actual < 160){
        order_info.style.transform = `translateY(${-90}px)`;
        menu.style.transform = `translateY(${-90}px)`;
    }

    let inf = document.querySelector("#info-restaurant");
    if(actual > 300 && !hidden && difference >= 15){
        inf.style.animation = 'disaperBanner 500ms forwards';
        menu.style.animation = 'up 500ms forwards';
        hidden = 1;
    }

    if(hidden && ((difference < -12) || actual < 300)){
        inf.style.animation = 'showBanner 500ms forwards';
        menu.style.animation = 'down 500ms forwards';
        hidden = 0;
    }

    console.log(lastScroll);
    lastScroll = actual;

});


/*

const verify = (entries) =>{
    const entry = entries[0];

    if(entry.isIntersecting){
        entry.target.style.animation = `show-item 500ms forwards`;
    }else entry.target.style.animation = 'hide-item 500ms forwards';


}

const itemsCard = document.querySelectorAll(".item-card");
const observer = new IntersectionObserver(verify);

document.addEventListener("scroll",(e)=>{
    itemsCard.forEach(item => {
        observer.observe(item);
    
    }); 
})

*/

function moveScrollTOElement(e) {
    var elemento = document.getElementById(e);
    elemento.scrollIntoView({ behavior: 'smooth' });
}

let menu_items = document.querySelectorAll(".button-div");

menu_items.forEach(e => {
    e.addEventListener("click",e=>{
        e.stopPropagation();
        let title = e.target.childNodes[0].textContent;
        let pos = title;
        moveScrollTOElement(pos);
    })
});

let submenu_items = document.querySelectorAll(".submenu-button");
submenu_items.forEach(e => {
    e.addEventListener("click",e=>{
        e.stopPropagation();
        let title = e.target.textContent;
        let pos = title;
        moveScrollTOElement(pos);
    })
});

///Localizacion 
let options = {
    maximunAge : 0,
    timeout : 3000,
    enableHighAccuracy : true,
};

const showLocation = (position)=>{
    obtenerDireccion(position.coords.latitude,position.coords.longitude);
};
const showError = (error) =>{
    console.log(error);
}

const findLocation = () =>{
    if(navigator.geolocation){
        const position = navigator.geolocation.getCurrentPosition(showLocation,showError,options);
    }
    else {
        console.log("No se pudo acceder a la direccion.")
    }

}



findLocation();