const headerPath = new URL('../header/header.html', import.meta.url).href;

export async function loadHeader() {
    const headerElement = document.getElementById("header");
    if (headerElement) {
        try {
            const response = await fetch(headerPath);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            headerElement.innerHTML = await response.text();
        } catch (error) {
            console.error("Помилка завантаження header:", error);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".header__burger");
  const mobileMenu = document.querySelector(".header__mobile-menu");

  if (burger && mobileMenu) {
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
});
