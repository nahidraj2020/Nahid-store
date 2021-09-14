const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// Rating Functionality 
const starsTotal = 5;

const getStars = rating => {
  const starPercentage = rating / starsTotal * 100;
  const starPercentageRounded = Math.round(starPercentage / 10) * 10;
  return starPercentage;
}

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const starWidth = getStars(product.rating.rate)
    const div = document.createElement("div");
    div.classList = "col";
    div.innerHTML = `<div class="card h-100 border-0 rounded-3 card-shadow">
              <img src=${product.image} class="card-img-top product-image mx-auto p-4" alt="...">
              <div class="card-body card-bg">
                <div style="min-height: 100px;">
                  <h5 class="card-title">${product.title}</h5>
                </div>
                <div class="stars-outer">
                  <div class="stars-inner" style="width: ${starWidth}%"></div>
                </div>
                <p class="d-inline-block fw-bold ps-3 pt-2 mb-0 text-secondary"><span class="fs-3 text-dark">${product.rating.rate} </span>/ 5 <span class="fw-normal">average rating</span></p>
                <p class="text-secondary">From <span class="fs-5 fw-bold text-black"> ${product.rating.count} </span> ratings</p>
                <h3 class="fw-bold text-info pb-4">$${product.price}</h3>
                <p class="card-text">Category: <span class="badge bg-warning text-dark">${product.category}</span></p>
              </div>
              <div class="card-footer p-0">
                <div class="row m-0 p-0">
                  <div class="col-6 p-0">
                    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-warning w-100 rounded-0 border-0">Add to cart</button>
                  </div>
                  <div class="col-6 p-0">
                    <button id="details-btn" class="btn btn-info text-white w-100 rounded-0 border-0">Details</button>
                  </div>  
                </div
              </div>
            </div>`;
    div.style.maxWidth = "26rem"
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  console.log(total)
  const gg = total.toFixed(2);
  document.getElementById(id).innerText = gg;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

