// card ები
fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((resp) => resp.json())
  .then((data) => products(data));

function products(card) {
  const productsDiv = document.querySelector(".products-div");

  productsDiv.innerHTML = "";
  card.forEach((food) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const foodIMG = document.createElement("img");
    foodIMG.src = food.image;

    const title = document.createElement("h2");
    title.textContent = food.name;

    const price = document.createElement("span");
    price.textContent = food.price;

    const button = document.createElement("button");
    button.textContent = "Add To Cart";
    button.addEventListener("click", () => addToCart(1, food.price, food.id));

    card.append(foodIMG, title, price, button);
    productsDiv.appendChild(card);
  });
}

function addToCart(qty, price, id) {
  const reqBodyObj = {
    quantity: qty,
    price: price,
    productId: id,
  };

  fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBodyObj),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

// categories ასარჩევი ველი
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  .then((resp) => resp.json())
  .then((data) => categories(data));

function categories(list) {
  const categoriesDiv = document.querySelector(".categories-div");
  categoriesDiv.classList.add(".categoires-button");

  const showAll = document.createElement("button");
  showAll.textContent = "All Product";
  categoriesDiv.appendChild(showAll);

  showAll.addEventListener("click", () => {
    fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
      .then((resp) => resp.json())
      .then((data) => products(data));
  });

  list.forEach((box) => {
    const button = document.createElement("button");
    button.textContent = box.name;
    categoriesDiv.appendChild(button);

    button.addEventListener("click", () => {
      fetch(
        `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${box.id}`,
      )
        .then((resp) => resp.json())
        .then((data) => products(data.products));
    });
  });
}

// categories filter
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  .then((resp) => resp.json())
  .then((data) => categoriesSel(data));

function categoriesSel(form) {
  const categoriesOpt = document.querySelector("#categorySel");
  const defaultCategories = document.createElement("option");
  defaultCategories.textContent = "Show All";
  defaultCategories.value = "";
  categoriesOpt.append(defaultCategories);
  form.forEach((box) => {
    const otherOption = document.createElement("option");
    otherOption.textContent = box.name;
    otherOption.value = box.id;
    categoriesOpt.appendChild(otherOption);
  });
}

// categories reset button

const filterReset = document.querySelector("#resetFilter");
const filterSubmit = document.querySelector("#submitFilter");

filterReset.addEventListener("click", () => {
  fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?`)
    .then((resp) => resp.json())
    .then((data) => products(data));
});

// categories submit button

filterSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const vegeterian = document.querySelector("#vegetarianSel");
  const nuts = document.querySelector("#nutsSel");
  const spiciness = document.querySelector("#spicinesSel");
  const category = document.querySelector("#categorySel");

  fetch(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian.value}&nuts=${nuts.value}&spiciness=${spiciness.value}&categoryId=${category.value}`,
  )
    .then((resp) => resp.json())
    .then((data) => products(data));
});

// cart functional

const cartBtn = document.querySelector("cart");
cartBtn.addEventListener("click", () => {
  document.querySelector("products-sec").classList.toggle("hidden");
  document.querySelector("cart-sec").classList.toggle("hidden");
  cartShow();
});

function cartShow() {
  const cartProduct = document.querySelector(".cart-product");
  cartProduct.innerHTML = "";
  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((resp) => resp.json())
    .then((data) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("");
    });
}
