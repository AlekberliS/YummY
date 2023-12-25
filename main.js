document.addEventListener("DOMContentLoaded", function () {
    const burgerIcon = document.getElementById("burger-icon");
    burgerIcon.addEventListener("click", toggleMenu);

    function toggleMenu(){
        const nav = document.getElementById("headerNavUl");
        nav.classList.toggle("show");
    }
});
