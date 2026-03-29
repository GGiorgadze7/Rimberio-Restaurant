// burger menu
const burgerBtn = document.querySelector(".burger-btn");
const nav = document.querySelector(".burger-nav");

burgerBtn.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
  burgerBtn.classList.toggle("burger-nav");
});

// best sellers
fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    showTopProducts(data);
  });

function showTopProducts(products) {
  const top3 = products.slice(0, 3);
  renderCards(top3);
}

function renderCards(products) {
  const cardsDiv = document.querySelector(".cards");
  cardsDiv.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${"More than 50 sales in 1 week"}</p>
    `;

    cardsDiv.appendChild(card);
  });
}

