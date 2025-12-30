let categorySelect=document.getElementById('categorySelect');
let productsDiv = document.getElementById('products');


let products = [];
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products.slice(0, 5)); 
  });

  //fetch products and display in products div
function displayProducts(products) 
    {
        productsDiv.innerHTML="";
        products.forEach(product => {
            productsDiv.innerHTML+=`<div class="col-md-4">
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" style="height:200px;object-fit:contain">
            <div class="card-body text-center">
              <h6>${product.title}</h6>
              <p>$${product.price}</p>
              <p>$${product.category}</p>
              <button onclick="showProductDetails(${product.id})"
              class="btn btn-outline-primary btn-sm">
              View Details
              </button>
              <button onclick="addToCart(${product.id})" class="btn btn-primary btn-sm">Add to Cart</button>
            </div>
          </div>
        </div>`;
        });
            console.log(products);
    };
//fetch category and display in select box
fetch('https://fakestoreapi.com/products/categories')
  .then(response => response.json())
  .then(categories => {
    categorySelect.innerHTML=' <option value="all">All Categories</option>'
    categories.forEach(cat => {
        categorySelect.innerHTML+=`<option value="${cat}">${cat}</option>`
        
    }
)})

//filter products by category
categorySelect.addEventListener('change',function(){
    let filteredProducts = categorySelect.value === "all" ? products : products.filter(product => product.category === categorySelect.value);
    displayProducts(filteredProducts);
});

//add to cart + quantity
let cart = [];

function addToCart(id) {
    const product = products.find((product) => product.id === id);
    const cartItem = cart.find((product) => product.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
      renderCart();
}

function updateTotal() {
  let totalQty = 0;
  let totalPrice = 0;
    cart.forEach(item => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;

    totalQty += qty;
    totalPrice += price* qty;
  });

  document.getElementById('totalQty').innerText = `Total Quantity: ${totalQty}`;
  document.getElementById('totalPrice').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

function renderCart() {
  cartItems.innerHTML = "";

  cart.forEach(product => {
    cartItems.innerHTML += `
    <li>
      ${product.title} - $${product.price} x ${product.quantity}
      <button onclick="removeItem(${product.id})">Remove</button>
    </li>`;
  });

  updateTotal();
}

function removeItem(id) {
  cart = cart.filter(product => product.id !== id);
  renderCart();
}

//search and filter

searchInput.addEventListener("input", () => {
  let value = searchInput.value.toLowerCase();
    let filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(value) ||
    product.category.toLowerCase().includes(value)
  );
  displayProducts(filteredProducts);
});


//price filter
document.getElementById('applyFilter').addEventListener('click', () => {
  let minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
  let maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    let filteredProducts = products.filter(product =>
    product.price >= minPrice && product.price <= maxPrice
  );
  displayProducts(filteredProducts);
});

//product details
function showProductDetails(id) {
  var product = products.find((product) => product.id === id);
productsDiv.innerHTML = `
  <div class="card">
    <img src="${product.image}" class="card-img-top" style="height:300px;object-fit:contain">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">$${product.price}</p>
      <p class="card-text">${product.category}</p>
      <p class="card-text">${product.description}</p>
      <button onclick="addToCart(${product.id})" class="btn btn-primary btn-sm">Add to Cart</button>
    </div>
  </div>
`;
  }

  //devide products on pages
function page1() {
  // getProducts("https://fakestoreapi.com/products?limit=6");
page1Products = products.slice(0, 5);
displayProducts(page1Products);
};
function page2() {
page2Products = products.slice(5, 10);
displayProducts(page2Products);
}
function page3() {
  page3Products = products.slice(10, 15);
  displayProducts(page3Products);
}
function page4() {
  page4Products = products.slice(15, 20);
  displayProducts(page4Products);
}




