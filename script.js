document.addEventListener("DOMContentLoaded", function () {
  const cardElements = [
    { imgId: "img1", nameId: "mealName1" },
    { imgId: "img2", nameId: "mealName2" },
    { imgId: "img3", nameId: "mealName3" },
    { imgId: "img4", nameId: "mealName4" },
  ];

  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i")
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals;
      const selectedMealIds = new Set();

      cardElements.forEach((card, index) => {
        let randomMeal;

        do {
          randomMeal = meals[Math.floor(Math.random() * meals.length)];
        } while (selectedMealIds.has(randomMeal.idMeal));

        selectedMealIds.add(randomMeal.idMeal);

        const imgElement = document.getElementById(card.imgId);
        imgElement.src = randomMeal.strMealThumb;
        imgElement.alt = randomMeal.strMeal;

        const nameElement = document.getElementById(card.nameId);
        nameElement.innerText = randomMeal.strMeal;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
