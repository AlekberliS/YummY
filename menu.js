let originalMenuData = [];
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

window.onload = function () {
  fetch("./meal.json")
    .then((response) => response.json())
    .then((data) => {
      originalMenuData = data.meals;
      displayMenuItems(originalMenuData);
    })
    .catch((error) => console.error("Error:", error));

  document.getElementById("priceFrom").addEventListener("input", applyFilters);
  document.getElementById("priceTo").addEventListener("input", applyFilters);
  document.getElementById("typeFilter").addEventListener("input", applyFilters);
  document
    .getElementById("ratingFilter")
    .addEventListener("input", applyFilters);
  document
    .getElementById("sortingOrder")
    .addEventListener("change", applyFilters);
  document
    .getElementById("sortingOrder2")
    .addEventListener("change", applyFilters);
  document
    .getElementById("titleFilter")
    .addEventListener("input", applyFilters);
  document
    .getElementById("restaurantFilter")
    .addEventListener("input", applyFilters);

  cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  updateCartCount();
};

const uniqueMealTypes = getUniqueMealTypes(originalMenuData);

const typeFilterDropdown = document.getElementById("typeFilter");
uniqueMealTypes.forEach((type) => {
  const option = document.createElement("option");
  option.value = type;
  option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  typeFilterDropdown.appendChild(option);
});

function displayMenuItems(menuData) {
  const menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = "";

  menuData.forEach((item) => {
    const menuItemDiv = document.createElement("div");
    menuItemDiv.className = "menuItem";

    menuItemDiv.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}">
            <p>Restaurant: ${item.restaurantChain}</p>
            <p>Price: $${item.price}</p>
            <p>Rating: ${item.rating}</p>
            <button class="addToCartButton" onclick="addToCart(${item.id})">
                <i class="fas fa-light fa-cart-circle-plus"></i> Add to Cart
            </button>
        `;

    menuContainer.appendChild(menuItemDiv);
  });
}
function applyFilters() {
  const typeFilter = Array.from(
    document.getElementById("typeFilter").selectedOptions
  ).map((option) => option.value.toLowerCase().trim());
  const priceFromFilter =
    parseFloat(document.getElementById("priceFrom").value) || 0;
  const priceToFilter =
    parseFloat(document.getElementById("priceTo").value) ||
    Number.MAX_SAFE_INTEGER;
  const ratingFilter =
    parseFloat(document.getElementById("ratingFilter").value) || 0;
  const sortingOrder = document.getElementById("sortingOrder").value;
  const sortingOrder2 = document.getElementById("sortingOrder2").value;
  const titleFilter = document
    .getElementById("titleFilter")
    .value.toLowerCase();
  const restaurantFilter = document
    .getElementById("restaurantFilter")
    .value.toLowerCase();

  let filteredMenu;

  if (typeFilter.includes("all")) {
    filteredMenu = originalMenuData.filter((item) => {
      const matchesPrice =
        item.price >= priceFromFilter && item.price <= priceToFilter;
      const matchesRating = item.rating >= ratingFilter;
      const matchesTitle = item.title
        .toLowerCase()
        .includes(titleFilter.trim());
      const matchesRestaurant = item.restaurantChain
        .toLowerCase()
        .includes(restaurantFilter.trim());

      return matchesPrice && matchesRating && matchesTitle && matchesRestaurant;
    });

    if (!isNaN(ratingFilter) && ratingFilter > 0) {
      filteredMenu = filteredMenu.filter((item) => item.rating >= ratingFilter);
    }

    if (sortingOrder === "ascending") {
      filteredMenu.sort((a, b) => a.price - b.price);
    } else if (sortingOrder === "descending") {
      filteredMenu.sort((a, b) => b.price - a.price);
    }
  } else {
    filteredMenu = originalMenuData.filter((item) => {
      const matchesPrice =
        item.price >= priceFromFilter && item.price <= priceToFilter;
      const matchesType = typeFilter.includes(item.typeOfMeal.toLowerCase());
      const matchesRating = item.rating >= ratingFilter;
      const matchesTitle = item.title
        .toLowerCase()
        .includes(titleFilter.trim());
      const matchesRestaurant = item.restaurantChain
        .toLowerCase()
        .includes(restaurantFilter.trim());

      return (
        matchesPrice &&
        matchesType &&
        matchesRating &&
        matchesTitle &&
        matchesRestaurant
      );
    });

    if (!isNaN(ratingFilter) && ratingFilter > 0) {
      filteredMenu = filteredMenu.filter((item) => item.rating >= ratingFilter);
    }

    if (sortingOrder === "ascending") {
      filteredMenu.sort((a, b) => a.price - b.price);
    } else if (sortingOrder === "descending") {
      filteredMenu.sort((a, b) => b.price - a.price);
    }
  }

  if (sortingOrder2 === "ascending") {
    filteredMenu.sort((a, b) => a.rating - b.rating);
  } else if (sortingOrder2 === "descending") {
    filteredMenu.sort((a, b) => b.rating - a.rating);
  }

  displayMenuItems(filteredMenu);
}

function updateCartCount() {
  const cartCountElement = document.getElementById("cartCount");
  cartCountElement.textContent = cartItems.length.toString();
}
function getUniqueMealTypes(menuData) {
  const uniqueMealTypes = new Set();
  menuData.forEach((item) => {
    uniqueMealTypes.add(item.typeOfMeal.toLowerCase());
  });
  return Array.from(uniqueMealTypes);
}

function addToCart(itemId) {
  const selectedItem = originalMenuData.find((item) => item.id === itemId);

  const existingItem = cartItems.find((item) => item.id === itemId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    selectedItem.quantity = 1;
    cartItems.push(selectedItem);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCount();
  alert("Item added to cart!");
}

function showCart() {
  alert("Show Cart Functionality");
}

function openCartModal() {
  const cartModal = document.getElementById("cartModal");
  const cartItemsContainer = document.getElementById("cartItemsContainer");

  cartItemsContainer.innerHTML = "";
  cartItems.forEach((item) => {
    const cartItemDiv = document.createElement("div");

    cartItemDiv.innerHTML = `
            <p>${item.title} - $${item.price}</p>
            <button onclick="increaseQuantity(${item.id})">+</button>
            <span>${item.quantity}</span>
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
            <hr>
        `;
    cartItemsContainer.appendChild(cartItemDiv);
  });

  updateTotalPrice();

  cartModal.style.display = "flex";
}

function closeCartModal() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
}

function increaseQuantity(itemId) {
  const selectedItem = cartItems.find((item) => item.id === itemId);
  selectedItem.quantity++;
  updateCartCount();
  openCartModal();
}

function decreaseQuantity(itemId) {
  const selectedItem = cartItems.find((item) => item.id === itemId);
  if (selectedItem.quantity > 1) {
    selectedItem.quantity--;
    updateCartCount();
    openCartModal();
  }
}

function removeFromCart(itemId) {
  cartItems = cartItems.filter((item) => item.id !== itemId);
  updateCartCount();
  openCartModal();
}

function updateTotalPrice() {
  const totalPriceElement = document.getElementById("totalPrice");
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalPriceElement.textContent = total.toFixed(2);
}

function placeOrder() {
  // alert('Order Placed!');

  cartItems = [];
  updateCartCount();

  closeCartModal();

  window.location.href = "./order.html";
}
document.addEventListener("DOMContentLoaded", function () {
  let filterButton = document.querySelector(".filterOnOff");
  let filters = document.querySelector(".filters");

  filters.style.display = "flex";

  filterButton.addEventListener("click", function () {
    if (filters.style.display === "none" || filters.style.display === "") {
      filters.style.display = "flex";
    } else {
      filters.style.display = "none";
    }
  });
});

let filterButton = document.querySelector(".filterOnOff");
const burgerIcon = document.getElementById("burger-icon");
if (burgerIcon.clicked) {
  filterButton.style.display = "none";
}
