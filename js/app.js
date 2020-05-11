const URL = "https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick";
const ul = document.getElementById("produits");
const input = document.getElementById("filtre");
const span = document.getElementsByClassName("fermer");
var produitsArray;


axios
    .get(URL)
    .then((response) => {
        produitsArray = Object.values(response.data);
        display(produitsArray)
        console.log(produitsArray)
    })
    .catch((err) => {
        console.log(err)
    });

function display() {

   

    produitsArray.forEach((makeup) => {
        ul.innerHTML += `<li class="prod"   data-product-id="${makeup.id}"><figure class="image"><img src="${makeup.image_link}" class="image"></figure>
    <figcaption class="name"><span class="brand">${makeup.brand}</span><br>
    ${makeup.name}<br>
    <span class="price">${makeup.price}${makeup.price_sign}</span></figcaption></li>
    `;
    const filtered = ul.querySelectorAll(".prod");
    console.log(filtered)
    filtered.forEach(li => li.onclick = AffichDetails)
    });

    input.oninput = (evt) => {
        console.log(evt.target.value)
        const produitFiltre = produitsArray.filter((makeup) => {
            return makeup.brand.toUpperCase().includes(evt.target.value.toUpperCase());
        })


        function afficheProduitFiltre() {
            ul.innerHTML = "";
            for (let i = 0; i < produitFiltre.length; i++) {
                console.log(produitFiltre[i].id)
                ul.innerHTML += `<li class="prod"><figure class="image"><img src="${produitFiltre[i].image_link}" class="image"></figure>
                <figcaption class="name"><span class="brand">${produitFiltre[i].brand}</span><br>
                ${produitFiltre[i].name}<br>
                <span class="price">${produitFiltre[i].price}${produitFiltre[i].price_sign}</span></figcaption></li>`;

            }
            
const filtered = ul.querySelectorAll(".prod");
            console.log(filtered)
            filtered.forEach(li => li.onclick = AffichDetails)
        }
        afficheProduitFiltre();

    }


   

}

function AffichDetails(evt) {
    console.log(evt.target.getAttribute("data-product-id"))
    console.log(produitsArray)
    const id = Number(evt.target.getAttribute("data-product-id"));
    const productCourant = produitsArray.filter(prod => prod.id === id)[0]
    console.log(productCourant)
    const modal = document.getElementById("modal-content");
    // const URLone = evt.target.getAttribute("data-product-id")
    modal.classList.remove("is-hidden");
    ul.innerHTML = "";
    input.style.display = "none";
            modal.innerHTML += `<section class="modal"><span class="fermer">&times</span><figure>
            <img src="${productCourant.image_link}" class="lips"></figure><article class="info">
            <h2 class="titre">${productCourant.brand}</h2>
            <h3 class="marque">${productCourant.name}</h3>
            <p class="description">${productCourant.tag_list}</p>
            <p class="description">${productCourant.description}</p>
            </article></section>`;
       

const span = modal.querySelector(".fermer");

span.onclick = function () {
    modal.style.display = "none";
    input.style.display = "block";
    display();

}

}