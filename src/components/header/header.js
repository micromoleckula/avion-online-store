const headerPath = new URL("header.html", import.meta.url).href;

export async function loadHeader() {
  const headerElement = document.getElementById("header");
  if (headerElement) {
    const response = await fetch(headerPath);
    headerElement.innerHTML = await response.text();

    const burger = document.querySelector(".header__burger");
    const mobileMenu = document.querySelector(".header__mobile-menu");

    burger.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      burger.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
      if (
        !mobileMenu.contains(event.target) &&
        !burger.contains(event.target)
      ) {
        mobileMenu.classList.remove("active");
        burger.classList.remove("active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadHeader();
});