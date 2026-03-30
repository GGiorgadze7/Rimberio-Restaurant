// burger menu
const burgerBtn = document.querySelector(".burger-btn");
const nav = document.querySelector(".burger-nav");

burgerBtn.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
  burgerBtn.classList.toggle("burger-nav");
});

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
    price.textContent = food.price + "$";

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
    .then(() => showToast("Item added to cart!"))
    .catch(() => showToast("Failed to add item.", true));
}

function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.classList.add("toast-notification");
  if (isError) toast.classList.add("toast-error");
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast-show"));

  setTimeout(() => {
    toast.classList.remove("toast-show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, 2500);
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

const cartBtn = document.querySelector(".cart");
cartBtn.addEventListener("click", () => {
  document.querySelector(".products-sec").classList.toggle("hidden");
  document.querySelector(".cart-sec").classList.toggle("hidden");
  fetchCart();
});

function fetchCart() {
  const cartItemsMain = document.querySelector(".cart-product");
  cartItemsMain.innerHTML = "";
  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        const cartItemName = document.createElement("div");
        cartItemName.classList.add("cartItemName");
        const cartImage = document.createElement("img");
        cartImage.src = item.product.image;
        const cartName = document.createElement("h3");
        cartName.classList.add("cart-food-name");
        cartName.textContent = item.product.name;
        cartItemName.append(cartImage);

        const qty = document.createElement("div");
        qty.classList.add("qty");
        qty.textContent = item.quantity;

        const qtyMinus = document.createElement("button");
        qtyMinus.textContent = "-";
        qtyMinus.classList.add("minusBtn");
        const qtyPlus = document.createElement("button");
        qtyPlus.classList.add("plus");
        qtyPlus.textContent = "+";
        qty.prepend(qtyMinus);
        qty.append(qtyPlus);

        const price = document.createElement("span");
        price.classList.add("price");
        price.textContent = "Price:  " + item.product.price + "$";

        const lorem = document.createElement("p");
        lorem.classList.add("lorem");
        lorem.textContent =
          "A delicious, traditional dish that stands out for its price and taste. Try it and enjoy, enjoy, Jigaro.";

        const total = document.createElement("span");
        total.classList.add("total");
        total.textContent =
          "Total-price: " + item.quantity * item.product.price + "$";

        const cartItemInfo = document.createElement("div");
        cartItemInfo.classList.add("cart-info");
        cartItemInfo.append(cartName, lorem, price);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.id = "deleteBtnId";
        deleteBtn.textContent = "X";

        cartItem.append(cartItemName, cartItemInfo, qty, total, deleteBtn);

        deleteBtn.addEventListener("click", () =>
          productDelete(item.product.id),
        );

        qtyMinus.addEventListener("click", () =>
          updateQuantity(
            item.quantity - 1,
            item.product.price,
            item.product.id,
          ),
        );
        qtyPlus.addEventListener("click", () =>
          updateQuantity(
            item.quantity + 1,
            item.product.price,
            item.product.id,
          ),
        );

        cartItemsMain.appendChild(cartItem);
      });
      let allTotal = 0;
      data.reduce(function (acc, item) {
        allTotal = acc + item.quantity * item.product.price;
        return allTotal;
      }, 0);

      document.querySelector(".totalPrice").textContent =
        "Total price:   " + allTotal + "$";
    });
}

function productDelete(id) {
  fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
    method: "DELETE",
  }).then(() => fetchCart());
}

function updateQuantity(quantity, price, productId) {
  if (quantity < 1) {
    return;
  }

  const reqBodyObj = {
    quantity: quantity,
    price: price,
    productId: productId,
  };

  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBodyObj),
  }).then(() => fetchCart());
}

// checkout modal
const checkoutBtn = document.querySelector(".checkout");
const overlay = document.querySelector(".checkout-overlay");
const cancelCheckout = document.querySelector(".btn-cancel-checkout");
const checkoutForm = document.querySelector(".checkout-form");
const cardNumber = document.querySelector("#cardNumber");
const cardExpiry = document.querySelector("#cardExpiry");

checkoutBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

cancelCheckout.addEventListener("click", () => {
  overlay.classList.add("hidden");
  checkoutForm.reset();
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
    checkoutForm.reset();
  }
});

cardNumber.addEventListener("input", () => {
  let val = cardNumber.value.replace(/\D/g, "").slice(0, 16);
  cardNumber.value = val.replace(/(\d{4})(?=\d)/g, "$1 ");
});

cardExpiry.addEventListener("input", () => {
  let val = cardExpiry.value.replace(/\D/g, "").slice(0, 4);
  if (val.length >= 3) val = val.slice(0, 2) + "/" + val.slice(2);
  cardExpiry.value = val;
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#cardName").value.trim();
  const number = cardNumber.value.replace(/\s/g, "");
  const expiry = cardExpiry.value.trim();
  const cvv = document.querySelector("#cardCvv").value.trim();

  if (!name || number.length < 16 || expiry.length < 5 || cvv.length < 3) {
    showToast("Please fill in all fields correctly.", true);
    return;
  }

  overlay.classList.add("hidden");
  checkoutForm.reset();
  showToast("Payment successful! Redirecting...");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
});
